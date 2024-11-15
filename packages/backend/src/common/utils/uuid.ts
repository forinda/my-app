import { injectable } from 'inversify';
import { Dependency } from '../di';

import { v4 as uuidv4, validate } from 'uuid';

@injectable()
@Dependency()
export class UUID {
  isValid(uuid: string) {
    return validate(uuid);
  }

  generate() {
    return uuidv4();
  }
}
