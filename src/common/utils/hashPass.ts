import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const comparePassAndHash = async (password: unknown, hash: unknown) => {
  if (typeof password !== 'string' || typeof hash !== 'string') {
    return false;
  }
  return await bcrypt.compare(password, hash);
};
