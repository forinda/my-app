type AddStringOrNumber = (
  a: string | number,
  b: string | number
) => string | number;

/**
 * Adds two numbers or concatenates two strings/numbers.
 *
 * @param {string | number} a - The first value.
 * @param {string | number} b - The second value.
 * @returns {string | number} - The sum if both are numbers, otherwise concatenated string.
 */
export const add: AddStringOrNumber = (a, b) => {
  return typeof a === 'number' && typeof b === 'number'
    ? a + b
    : String(a) + String(b);
};
