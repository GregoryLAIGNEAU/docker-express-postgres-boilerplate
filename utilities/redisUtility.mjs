import { createClient } from "redis";

import redisConfig from "#config/redisConfig.mjs";
import logger from "./loggerUtility.mjs";

const redisClient = createClient(redisConfig);

redisClient.on("connect", () => logger.info("Connecting to Redis server..."));
redisClient.on("ready", () => logger.info("Redis client is ready to use"));
redisClient.on("end", () => logger.info("Redis connection has been closed"));
redisClient.on("error", (error) => logger.error("Redis Client Error", error));
redisClient.on("reconnecting", () => {
  logger.info("Redis client is trying to reconnect to the server");
});

try {
  await redisClient.connect();
} catch (error) {
  logger.error("Failed to connect to Redis server", error);
}

export default redisClient;
