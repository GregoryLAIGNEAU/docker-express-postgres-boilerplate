import { DB_CONFIG } from "./envConfig.mjs";

export const dbOptions = {
  host: DB_CONFIG.PG_HOST,
  port: DB_CONFIG.PG_PORT,
  database: DB_CONFIG.PG_NAME,
  username: DB_CONFIG.PG_USERNAME,
  password: DB_CONFIG.PG_PASSWORD,
  ssl: DB_CONFIG.PG_SSL,
};
