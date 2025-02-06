import { isProduction } from "../utils/envUtil.mjs";

const redisConfig = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    tls: isProduction,
  },
};

export default redisConfig;
