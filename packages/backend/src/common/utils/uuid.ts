/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify';
import { Dependency } from '../di';

import { v4 as uuidv4, validate as isValid } from 'uuid';
import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';

type ValidationOptions = {
  throwError?: boolean;
};

type GenerateOptions = {
  version?: 1 | 2 | 3 | 4 | 5;
};
@injectable()
@Dependency()
export class UUID {
  /**
   *
   * @param uuid The UUID to validate
   * @param {ValidationOptions} options  throwErr: If true, throws an error if the UUID is invalid
   * @returns  boolean
   */
  validateUUID(uuid: string, options: ValidationOptions = {}) {
    const valid = isValid(uuid);

    if (!valid && options.throwError) {
      throw new ApiError('Invalid UUID', HttpStatus.BAD_REQUEST);
    }

    return valid;
  }

  /**
   * Function to generate a UUID
   * @param {GenerateOptions} _  version: The UUID version to generate
   * @returns string
   */
  generateUUID(_: GenerateOptions = {}) {
    return uuidv4();
  }
}
