import * as joi from 'joi';

interface EnvVars {
  PORT: string;

  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_PORT: string;
  DATABASE_PASSWORD: string;
  DATABASE_USER: string;

  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
};

export const envValidationsSchema = joi.object<EnvVars>({
  PORT: joi.string().required(),

  DATABASE_HOST: joi.string().required(),
  DATABASE_NAME: joi.string().required(),
  DATABASE_PORT: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_USER: joi.string().required(),

  JWT_SECRET_KEY: joi.string().required(),
  JWT_EXPIRES_IN: joi.string().default('24h'),
})
  .unknown(true);
