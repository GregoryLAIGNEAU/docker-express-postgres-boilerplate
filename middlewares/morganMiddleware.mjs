import morgan from "morgan";

import { format, skip, stream } from "#config/morganConfig.mjs";

export const httpLogger = morgan(format, {
  stream,
  skip,
});
