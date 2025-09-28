import { ApiError } from "./ApiError.mjs";

export class ForbiddenError extends ApiError {
  constructor(message = "Invalid CSRF token") {
    super(message, 403);
  }
}
