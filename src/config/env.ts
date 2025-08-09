import 'dotenv/config';

export const ENV: Readonly<{
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
}> = {
  PORT: Number(process.env.PORT ?? 3000),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-secret-change-me'
};