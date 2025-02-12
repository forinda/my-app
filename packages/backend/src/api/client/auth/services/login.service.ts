import { inject, injectable } from 'inversify';
import { Dependency } from '@/common/di';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { HttpStatus } from '@/common/http';
import { User } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { PasswordProcessor } from '@/common/utils/password';
import { CookieProcessor } from '@/common/utils/cookie';
import { useDrizzle } from '@/db';
import { Config } from '@/common/config';
import type { LoginUserInput } from '../schema/schema';

@injectable()
@Dependency()
export class LoginUserService {
  @inject(PasswordProcessor) private passwordProcessor: PasswordProcessor;
  @inject(Config) private config: Config;

  @TransactionalService()
  async create(data: LoginUserInput) {
    const db = useDrizzle();
    const isEmail = data.emailOrUsername.includes('@');
    const existingUser = await db.query.User.findFirst({
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

    // setCookie(event, config.SESSION_COOKIE_NAME, signedSession, {
    //   ...otherCookieOptions,
    //   sameSite: (otherCookieOptions.sameSite ||
    //     'lax')
    //   expires: expiry
    // });

    return {
      signedSession,
      message: 'Login successful',
      expiry,
      otherCookieOptions
    };
  }
}
