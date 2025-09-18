import { LIMITATIONS } from './limitations';

export const MESSAGES = {
  VALIDATE: {
    NAME_MIN: 'Name must be at least 2 characters long',
    NAME_MAX: 'Name cannot be longer than 50 characters',
    EMAIL_MAX: 'Email cannot be longer than 100 characters',
    PASSWORD_MIN: 'Password must be at least 8 characters long',
    PASSWORD_MAX: 'Password cannot be longer than 30 characters',
    PASSWORD_FORMAT:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    PHONE_NUMBER_FORMAT: (val = 'Phone number') =>
      `${val} must be a valid phone number with optional leading +`,
    AVATAR_SIZE: 'Avatar image cannot be bigger than 1 GB',
    AVATAR_TYPE: (types = LIMITATIONS.AVATAR.TYPES) =>
      `Avatar image can obnly be one og these types:${types.map((el) => ' ' + el)}`,
  },
};
