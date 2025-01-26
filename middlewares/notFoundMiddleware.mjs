import { NotFoundError } from "../errors/indexError.mjs";

const notFoundMiddleware = (req, res, next) => {
  next(new NotFoundError());
};

export default notFoundMiddleware;
