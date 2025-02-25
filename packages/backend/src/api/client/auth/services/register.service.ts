import { inject, injectable } from 'inversify';
import { Dependency } from '@/common/di';
import type { TransactionContext } from '@/common/decorators/service-transaction';
import { TransactionalService } from '@/common/decorators/service-transaction';
import { HttpStatus } from '@/common/http';
import type { SelectUserInterface } from '@/db/schema';
import { OrganizationInvite, User } from '@/db/schema';
import { and, eq, or } from 'drizzle-orm';
import { PasswordProcessor } from '@/common/utils/password';
import { PayloadValidator } from '@/common/schema/validator';
import { formatKenyanPhone } from '@/common/utils/phone-number-format';
import { generateAvatar } from '@/common/utils/avatar';
import type { RegisterUserInput } from '../schema/schema';
import { ApiError } from '@/common/errors/base';

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

      throw new ApiError(message, HttpStatus.BAD_REQUEST, {});
    }
    console.log('---------Some-----------');
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

    const preExistingInvites =
      await transaction!.query.OrganizationInvite.findMany({
        where: and(
          eq(OrganizationInvite.email, data.email.toLowerCase()),
          eq(OrganizationInvite.status, 'pending')
        )
      });

    if (preExistingInvites.length > 0) {
      // Update the user_id in the invites
      await transaction!
        .update(OrganizationInvite)
        .set({
          user_id: rest.id
        })
        .where(
          and(
            eq(OrganizationInvite.email, data.email.toLowerCase()),
            eq(OrganizationInvite.status, 'pending')
          )
        )
        .execute();
    }

    return {
      status: HttpStatus.CREATED,
      data: rest,
      message: 'User registered successfully'
    };
  }
}
