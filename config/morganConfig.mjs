import { isProduction } from "../utils/envUtil.mjs";
import logger from "../utils/loggerUtil.mjs";

const format = isProduction
  ? (tokens, req, res) => {
      return JSON.stringify({
        message: "incoming-request",
        "request-data": {
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: Number.parseInt(tokens.status(req, res)),
          "content-length": tokens.res(req, res, "content-length"),
          "response-time": `${tokens["response-time"](req, res)} ms`,
        },
      });
    }
  : "dev";

const stream = {
  write: (message) => {
    if (isProduction) {
      const data = JSON.parse(message);

      return logger.http(data);
    }

    logger.http(message.trim());
  },
};

const skip = isProduction ? (req, res) => res.statusCode < 400 : () => false;

export { format, stream, skip };