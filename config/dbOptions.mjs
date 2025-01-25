const dbOptions = {
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: process.env.PG_SSL,
};

export default dbOptions;
