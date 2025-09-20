export * from './limitations';
export * from './messages';

export const CONF_JWT = {
  EXPIRES_ACCESS: '15m',
  EXPIRES_REFRESH: '7d',
  getFutureDateExpiresRefresh: () =>
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
} as const;
