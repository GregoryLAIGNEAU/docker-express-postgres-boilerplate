import { PG_HOST, PG_NAME, PG_PASSWORD, PG_PORT, PG_SSL, PG_USERNAME } from "./envConfig.mjs";

export const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_NAME,
  username: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: PG_SSL,
};
