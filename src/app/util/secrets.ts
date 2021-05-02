import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env' });
}

export const JWT_SECRET = process.env.JWT_SECRET || '';

if (!JWT_SECRET) {
  console.log('No JWT secret string. Set JWT_SECRET environment variable.');
  process.exit(1);
}
