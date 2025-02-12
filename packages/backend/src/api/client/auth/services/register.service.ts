import { inject, injectable } from 'inversify';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { HttpStatus } from '@/common/http';
import type { SelectUserInterface } from '@/db/schema';
import { User } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { PasswordProcessor } from '@/common/utils/password';
import { PayloadValidator } from '@/common/schema/validator';
import { formatKenyanPhone } from '@/common/utils/phone-number-format';
import { generateAvatar } from '@/common/utils/avatar';
import type { RegisterUserInput } from '../schema/schema';

@injectable()
@Dependency()
export class RegisterUserService {
  @inject(PasswordProcessor) private passwordProcessor: PasswordProcessor;
  @inject(PayloadValidator) readonly validateSchema: PayloadValidator;

  @TransactionalService()
  async create({ data, transaction }: TransactionContext<RegisterUserInput>) {
    data.phone_number = formatKenyanPhone(data.phone_number);
    const filterExistingUserQuery = or(
      eq(User.email, data.email),
      eq(User.username, data.username),
      eq(User.phone_number, data.phone_number)
    );
    const existingUser = await transaction!.query.User.findFirst({
      where: filterExistingUserQuery
    });

    if (existingUser) {
      const emailMatch = existingUser.email === data.email;
      const usernameMatch = existingUser.username === data.username;
      const phoneMatch = existingUser.phone_number === data.phone_number;
      let message = 'User already exists';

      if (emailMatch) {
        message = 'Email already exists';
      }
      if (usernameMatch) {
        message = 'Username already exists';
      }
      if (phoneMatch) {
        message = 'Phone number already exists';
      }

      return {
        status: HttpStatus.CONFLICT,
        message
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = (
      await transaction!
        .insert(User)
        .values({
          ...data,
          password: await this.passwordProcessor.hash(data.password),
          avatar: generateAvatar(data.first_name, data.last_name)
        } as SelectUserInterface)
        .returning()
        .execute()
    )[0];

    // return createHttpResponse(event, {
    //   status: HttpStatus.CREATED,
    //   data: rest
    // });
    return {
      status: HttpStatus.CREATED,
      data: rest,
      message: 'User registered successfully'
    };
  }
}
