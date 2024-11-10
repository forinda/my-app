import { injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import { Dependency } from '../di';

@injectable()
@Dependency()
export class PasswordProcessor {
  /**
   * The `hash` method is a placeholder for a password hashing function.
   * @param {string} password The password to hash.
   * @returns {Promise<string>} A promise that resolves to a hashed password.
   */
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  /**
   * The `compare` method is a placeholder for a password comparison function.
   * @param {string} password The password to compare.
   * @param {string} hash The hash to compare against.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the password matches the hash.
   */
  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
