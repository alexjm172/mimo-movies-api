import 'dotenv/config';

export const ENV = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV ,
  JWT_SECRET: process.env.JWT_SECRET 
};
