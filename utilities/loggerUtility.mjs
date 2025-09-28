import { createLogger, transports } from "winston";

import { developmentTransport, loggerConfig } from "#config/loggerConfig.mjs";
import { isDevelopment } from "./envUtility.mjs";

export const logger = createLogger(loggerConfig);

if (isDevelopment) {
  logger.add(new transports.Console(developmentTransport));
}
