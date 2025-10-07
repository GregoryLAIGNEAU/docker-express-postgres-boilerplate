import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_TLS } from "./envConfig.mjs";

export const redisConfig = {
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    tls: REDIS_TLS,
  },
};
