import { REDIS_CONFIG } from "./envConfig.mjs";

export const redisConfig = {
  password: REDIS_CONFIG.REDIS_PASSWORD,
  socket: {
    host: REDIS_CONFIG.REDIS_HOST,
    port: REDIS_CONFIG.REDIS_PORT,
    tls: REDIS_CONFIG.REDIS_TLS,
  },
};
