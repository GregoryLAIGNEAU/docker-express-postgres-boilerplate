import { format, transports } from "winston";

import { LOG_LEVEL } from "./envConfig.mjs";

const { colorize, combine, errors, json, printf, timestamp } = format;

export const loggerConfig = {
  level: LOG_LEVEL,
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
};

export const developmentTransport = {
  format: combine(
    colorize(),
    printf(({ level, message, timestamp, stack, ...meta }) => {
      const formattedMeta = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";

      if (stack) {
        return `${level}: ${stack}`;
      }

      return `${level}: ${message} ${formattedMeta}`;
    }),
  ),
};
