import { RateLimiterRedis } from "rate-limiter-flexible";

import { rateLimiterConfig } from "#config/rateLimiterConfig.mjs";
import { redisClient } from "#utilities/redisUtility.mjs";

const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  ...rateLimiterConfig,
});

export const rateLimiter = async (req, res, next) => {
  try {
    await rateLimiterRedis.consume(req.ip);
    next();
  } catch (error) {
    if (error.remainingPoints === 0 && error.msBeforeNext) {
      const seconds = Math.ceil(error.msBeforeNext / 1000);

      res.set("Retry-After", String(seconds));

      res.status(429).json({
        message: "Too many requests",
      });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
