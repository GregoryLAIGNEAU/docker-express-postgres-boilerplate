import morgan from "morgan";

import { format, skip, stream } from "#config/morganConfig.mjs";

const morganMiddleware = morgan(format, {
  stream,
  skip,
});

export default morganMiddleware;
