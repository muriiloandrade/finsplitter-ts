import { registerAs } from '@nestjs/config';
import Joi from 'joi';

interface EnvVars {
  PORT: number;
  NODE_ENV: string;
  LOG_FORMAT: string;
}

export const validationSchema = Joi.object<EnvVars, true>({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('production'),
  LOG_FORMAT: Joi.string()
    .valid('development', 'production')
    .default('production'),
});

export const envConfig = registerAs('app', () => {
  const env = process.env;

  return {
    port: +env.PORT,
    env: env.NODE_ENV || 'production',
    logFormat: env.LOG_FORMAT,
  };
});
