export const LIMITATIONS = {
  NAME: {
    MIN: 2,
    MAX: 50,
  },
  EMAIL: {
    MAX: 100,
  },
  PASSWORD: {
    MIN: 3,
    MAX: 8,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  PHONE: {
    MIN: 3,
    MAX: 20,
    REGEX: /^\+?[0-9]{6,20}$/,
  },
  AVATAR: {
    SIZE_LIM: 1 * 1024 * 1024 * 1024, // 1 GB in bytes
    TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },
} as const;
