import { inject, injectable } from 'inversify';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { HttpStatus } from '@/common/http';
import { User } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { PasswordProcessor } from '@/common/utils/password';
import { CookieProcessor } from '@/common/utils/cookie';
import { Config } from '@/common/config';
import type { LoginUserInput } from '../schema/schema';

@injectable()
@Dependency()
export class LoginUserService {
  @inject(PasswordProcessor) private passwordProcessor: PasswordProcessor;
  @inject(Config) private config: Config;

  @TransactionalService()
  async create({ data, transaction }: TransactionContext<LoginUserInput>) {
    const isEmail = data.emailOrUsername.includes('@');
    const existingUser = await transaction!.query.User.findFirst({
      where: isEmail
        ? eq(User.email, data.emailOrUsername)
        : eq(User.username, data.emailOrUsername)
    });

    if (!existingUser) {
      // return createHttpResponse(event, {
      //   status: 400,
      //   message: 'Account does not exist'
      // });
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Account does not exist'
      };
    }
    const isPasswordValid = await this.passwordProcessor.compare(
      data.password,
      existingUser.password!
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid login credentials'
      };
    }
    const { uuid, password: _, ...userRest } = existingUser;
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

    return {
      signedSession,
      message: 'Login successful',
      expiry,
      otherCookieOptions,
      data: userRest,
      cookieName: config.SESSION_COOKIE_NAME
    };
  }
}
