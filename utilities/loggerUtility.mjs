import { createLogger } from "winston";
import { transports } from "winston";
import { isDevelopment } from "./envUtility.mjs";
import { loggerConfig, developmentTransport } from "../config/loggerConfig.mjs";

const logger = createLogger(loggerConfig);

if (isDevelopment) {
  logger.add(new transports.Console(developmentTransport));
}

export default logger;
