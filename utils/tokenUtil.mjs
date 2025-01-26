import { createHash, randomBytes } from 'node:crypto';

const generateToken = () => {
  return randomBytes(32).toString('hex');
};

const hashToken = (token) => {
  return createHash('sha256').update(token).digest('hex');
};

export { generateToken, hashToken };