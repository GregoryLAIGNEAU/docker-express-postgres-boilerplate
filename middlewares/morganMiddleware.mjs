import morgan from "morgan";
import { format, stream, skip } from "../config/morganConfig.mjs";

const morganMiddleware = morgan(format, {
  stream,
  skip,
});

export default morganMiddleware;
