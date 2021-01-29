import * as dotenv from 'dotenv';
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// database
const host = process.env.HOST_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const database = {
  development: process.env.DEV_DB_NAME,
  testing: process.env.TEST_DB_NAME,
  production: process.env.PROD_DB_NAME,
};

const databaseConfig = {
  host,
  username,
  password,
  port,
  database: database[NODE_ENV],
};

// typeorm
const enviroment = {
  development: databaseConfig,
  testing: databaseConfig,
  production: databaseConfig,
};
const TYPEORM = enviroment[NODE_ENV];

export { NODE_ENV, TYPEORM };
