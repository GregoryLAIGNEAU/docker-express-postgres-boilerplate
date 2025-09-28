import { NotFoundError } from "#errors/indexError.mjs";

export const notFoundMiddleware = (_req, _res, next) => {
  next(new NotFoundError());
};
