import { injectable } from 'inversify';
import type { ApiRes } from '../http';
import type { ApiRequestContext } from '../interfaces/controller';

@injectable()
export abstract class BasePostController {
  /**
   * The `post` method is an abstract method that must be implemented by any
   * subclass that extends this base controller.
   * @param {ApiRequestContext} context The context object containing the request and response objects.
   * @returns {Promise<void | ApiRes>} A promise that resolves to void or an ApiRes object.
   */
  abstract post(context: ApiRequestContext): Promise<void | ApiRes>;
}

@injectable()
export abstract class BaseGetController {
  /**
   * The `get` method is an abstract method that must be implemented by any
   * subclass that extends this base controller.
   * @param {ApiRequestContext} context The context object containing the request and response objects.
   * @returns {Promise<void | ApiRes>} A promise that resolves to void or an ApiRes object.
   */
  abstract get(context: ApiRequestContext): Promise<void | ApiRes>;
}

@injectable()
export abstract class BaseDeleteController {
  /**
   * The `delete` method is an abstract method that must be implemented by any
   * subclass that extends this base controller.
   * @param {ApiRequestContext} context The context object containing the request and response objects.
   * @returns {Promise<void | ApiRes>} A promise that resolves to void or an ApiRes object.
   */
  abstract delete(context: ApiRequestContext): Promise<void | ApiRes>;
}

@injectable()
export abstract class BasePatchController {
  /**
   * The `patch` method is an abstract method that must be implemented by any
   * subclass that extends this base controller.
   * @param {ApiRequestContext} context The context object containing the request and response objects.
   * @returns {Promise<void | ApiRes>} A promise that resolves to void or an ApiRes object.
   */
  abstract patch(context: ApiRequestContext): Promise<void | ApiRes>;
}

@injectable()
export abstract class BasePutController {
  /**
   * The `put` method is an abstract method that must be implemented by any
   * subclass that extends this base controller.
   * @param {ApiRequestContext} context The context object containing the request and response objects.
   * @returns {Promise<void | ApiRes>} A promise that resolves to void or an ApiRes object.
   */
  abstract put(context: ApiRequestContext): Promise<void | ApiRes>;
}
