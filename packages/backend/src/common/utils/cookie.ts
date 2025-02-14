import { type KeyObject, createHmac, timingSafeEqual } from 'node:crypto';
import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';

/**
 * Represents a secret used for signing or encrypting cookies.
 *
 * This can be a string, a Buffer, or a KeyObject.
 *
 * @typedef {string | Buffer | KeyObject} CookieSecret
 */
export type CookieSecret = string | Buffer | KeyObject;

/**
 * @author Felix Orinda
 * @fileoverview A class for processing cookies, including serialization, deserialization,
 * signing, and unsigning of cookie values.
 * @example
 * const processor = new CookieProcessor();
 * const serialized = processor.serialize({ key: "value" });
 * const signed = processor.sign(serial,someSecret);
 * const unsigned = processor.unsign(signed, someSecret);
 * const deserialized = processor.deserialize(unsigned);
 *
 */
export class CookieProcessor {
  /**
   * Serializes an object into a base64-encoded string.
   *
   * @param obj - The object to serialize.
   * @returns The base64-encoded string representation of the object.
   * @throws Will throw an error if the serialized object exceeds 4096 bytes.
   */
  static serialize(obj: object) {
    const value = Buffer.from(JSON.stringify(obj), 'utf-8').toString('base64');

    if (Buffer.byteLength(value) > 4096)
      throw new ApiError('Cookie too large', HttpStatus.BAD_REQUEST, {});

    return value;
  }

  /**
   * Deserializes a base64-encoded string into an object.
   *
   * @param value - The base64-encoded string to deserialize.
   * @returns The deserialized object.
   */
  static deserialize<Resp = any>(value: string): Resp {
    return JSON.parse(Buffer.from(value, 'base64').toString('utf-8'));
  }

  /**
   * Signs a given value using HMAC with the provided secret.
   *
   * @param value - The value to be signed.
   * @param secret - The secret key used for signing.
   * @returns The signed value in the format `${value}.${signature}`.
   */
  static sign(value: string, secret: CookieSecret) {
    const signature = createHmac('sha256', secret)
      .update(value)
      .digest('base64')
      .replace(/=+$/, '');

    return `${value}.${signature}`;
  }

  /**
   * Unsigns a signed cookie value and verifies its integrity using the provided secret.
   *
   * @param input - The signed cookie value to be unsigned.
   * @param secret - The secret used to sign the cookie.
   * @returns The original unsigned cookie value if the signature is valid.
   * @throws Will throw an error if the cookie signature is invalid.
   */
  static unsign(input: string, secret: CookieSecret) {
    const value = input.slice(0, input.lastIndexOf('.'));
    const expectedInput = CookieProcessor.sign(value, secret);
    const expectedBuffer = Buffer.from(expectedInput);
    const inputBuffer = Buffer.from(input);

    if (
      !(
        expectedBuffer.equals(inputBuffer) &&
        timingSafeEqual(expectedBuffer, inputBuffer)
      )
    ) {
      throw new ApiError(
        'Invalid cookie signature',
        HttpStatus.BAD_REQUEST,
        {}
      );
    }

    return value;
  }
}
