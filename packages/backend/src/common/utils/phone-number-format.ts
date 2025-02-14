import { ApiError } from '../errors/base';
import { HttpStatus } from '../http';

const kenyanPhoneRegex = /^(07|01|\+2547|\+2541|2547|2541)\d{8}$/;

type ValidateProps = {
  throwError?: boolean;
};
export const validatePhone = {
  // Kenyan phone numbers must start with 07 or 01 or +2547 or +2541 or 2541 or 2547 with the rest of the 8 digits being numbers
  validate: (phone: string, { throwError = false }: ValidateProps = {}) => {
    const valid = kenyanPhoneRegex.test(phone.toString().trim());

    if (!valid && throwError) {
      throw new ApiError('Invalid phone number', HttpStatus.BAD_REQUEST);
    }

    return valid;
  },

  message: 'Invalid phone number'
};

export function formatKenyanPhone(phone: string) {
  validatePhone.validate(phone);

  return 254 + phone.slice(-9);
}

export const phoneValidator = Object.assign(
  {},
  { formatKenyanPhone, validatePhone }
);
