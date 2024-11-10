import { inject, injectable } from 'inversify';
import type { CreateUserRequestBody } from '../schema/create-user-request.schema';
import { User } from '@/db/schema';
import db from '@/db';
import { eq, or } from 'drizzle-orm';
import {
  createHttpErrorResponse,
  createHttpSuccessResponse
} from '@/common/utils/http-response';
import { HttpStatus } from '@/common/http';
import { PasswordProcessor } from '@/common/utils/password';
import { Dependency } from '@/common/di';

@injectable()
@Dependency()
export class CreateUserService {
  @inject(PasswordProcessor) private passwordProcessor: PasswordProcessor;
  async create(body: CreateUserRequestBody) {
    const { email, password, username } = body!;
    const existingUser = await db
      .select()
      .from(User)
      .where(or(eq(User.email, email), eq(User.username, username)));

    if (existingUser.length) {
      const [user] = existingUser;

      createHttpErrorResponse(
        HttpStatus.CONFLICT,
        user.email === email
          ? 'Email already exists'
          : 'Username already exists'
      );
    }
    body.password = await this.passwordProcessor.hash(password);
    const createdUser = await db
      .insert(User)
      .values({
        last_login_ip: '',
        is_active: true,
        is_email_verified: false,
        needs_to_reset_password: false,
        last_password_reset_at: new Date(),
        last_login_at: new Date(),
        ...body
      } as any)
      .returning({
        id: User.id,
        email: User.email,
        createdAt: User.created_at,
        updatedAt: User.updated_at,
        first_name: User.first_name,
        last_name: User.last_name,
        username: User.username,
        gender: User.gender,
        is_active: User.is_active
      });

    return createHttpSuccessResponse(
      createdUser,
      HttpStatus.CREATED,
      'User created successfully'
    );
  }
}
