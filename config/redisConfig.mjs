import { REDIS_CONFIG } from "./envConfig.mjs";

export const redisConfig = {
  url: `redis://${REDIS_CONFIG.REDIS_USER}:${REDIS_CONFIG.REDIS_PASSWORD}@${REDIS_CONFIG.REDIS_HOST}:${REDIS_CONFIG.REDIS_PORT}`,
};
