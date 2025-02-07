import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "../utils/redisUtil.mjs";

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 10,
  duration: 60,
  useRedisPackage: true,
  disableOfflineQueue: true,
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
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

export default rateLimiterMiddleware;
