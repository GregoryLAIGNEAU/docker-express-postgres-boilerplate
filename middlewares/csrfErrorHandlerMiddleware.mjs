import { ForbiddenError } from "#errors/ForbiddenError.mjs";
import { invalidCsrfTokenError } from "./csrfMiddleware.mjs";

export const csrfErrorHandler = (err, _req, _res, next) => {
  if (err === invalidCsrfTokenError) {
    throw new ForbiddenError("Invalid CSRF token");
  }

  next(err);
};
