import ForbiddenError from "#errors/ForbiddenError.mjs";
import { invalidCsrfTokenError } from "./csrfMiddleware.mjs";

export const csrfErrorHandlerMiddleware = (err, _req, _res, next) => {
  if (err === invalidCsrfTokenError) {
    throw new ForbiddenError("Invalid CSRF token");
  }

  next(err);
};
