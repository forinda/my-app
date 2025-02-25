import { inject, injectable } from 'inversify';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { HttpStatus } from '@/common/http';
import { AuthSession, User } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { PasswordProcessor } from '@/common/utils/password';
import { CookieProcessor } from '@/common/utils/cookie';
import { Config } from '@/common/config';
import type { LoginUserInput } from '../schema/schema';
import type { BareObject } from '@/common/interfaces/helpers';
import { phoneValidator } from '@/common/utils/phone-number-format';
import { ApiError } from '@/common/errors/base';

@injectable()
@Dependency()
export class LoginUserService {
  @inject(PasswordProcessor) private passwordProcessor: PasswordProcessor;
  @inject(Config) private config: Config;

  @TransactionalService()
  async login({ data, transaction }: TransactionContext<LoginUserInput>) {
    const isEmail = data.emailOrUsername.includes('@');

    const isvalidPhone = phoneValidator.validatePhone.validate(
      data.emailOrUsername
    );

    const userLookupQuery = isEmail
      ? eq(User.email, data.emailOrUsername)
      : isvalidPhone
        ? eq(
            User.phone_number,
            phoneValidator.formatKenyanPhone(data.emailOrUsername)
          )
        : eq(User.username, data.emailOrUsername);
    const existingUser = (
      await transaction!
        .select({
          uuid: User.uuid,
          password: User.password
        })
        .from(User)
        .where(userLookupQuery)
    )[0];

    if (!existingUser) {
      throw new ApiError('Account does not exist', HttpStatus.BAD_REQUEST, {});
    }

    const isPasswordValid = await this.passwordProcessor.compare(
      data.password,
      existingUser.password!
    );

    if (!isPasswordValid) {
      throw new ApiError(
        'Invalid login credentials',
        HttpStatus.BAD_REQUEST,
        {}
      );
    }
    delete (existingUser as BareObject)['password'];
    const { uuid } = existingUser;
    const config = this.config.conf;
    const session = CookieProcessor.serialize({ uid: uuid });
    const signedSession = CookieProcessor.sign(session, config.COOKIE_SECRET);
    const { rememberMeExpires, maxAge, ...otherCookieOptions } =
      this.config.cookieOpts;
    const expiry = new Date(
      Date.now() +
        (data.rememberMe ? parseInt(rememberMeExpires) : parseInt(maxAge))
    );

    await transaction!
      .update(User)
      .set({ last_login_at: new Date().toISOString() })
      .where(eq(User.uuid, uuid))
      .execute();
    const authSession = await transaction!.query.AuthSession.findFirst({
      where: eq(AuthSession.auth_session_user_id, uuid)
    });

    if (authSession) {
      await transaction!.update(AuthSession).set({ ip: data.ip }).execute();
    } else {
      await transaction!.insert(AuthSession).values({
        auth_session_user_id: uuid,
        ip: data.ip
      });
    }

    return {
      signedSession,
      message: 'Login successful',
      expiry,
      otherCookieOptions,
      data: {},
      cookieName: config.SESSION_COOKIE_NAME
    };
  }
}
