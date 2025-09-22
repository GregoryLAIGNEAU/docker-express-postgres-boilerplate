import { NotFoundError } from "../errors/indexError.mjs";

const notFoundMiddleware = (_req, _res, next) => {
  next(new NotFoundError());
};

export default notFoundMiddleware;
