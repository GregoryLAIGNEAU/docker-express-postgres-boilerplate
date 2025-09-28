import morgan from "morgan";

import { format, skip, stream } from "#config/morganConfig.mjs";

export const morganMiddleware = morgan(format, {
  stream,
  skip,
});
