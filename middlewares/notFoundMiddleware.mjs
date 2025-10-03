import { NotFoundError } from "#errors/indexError.mjs";

export const notFound = (_req, _res, next) => {
  next(new NotFoundError());
};
