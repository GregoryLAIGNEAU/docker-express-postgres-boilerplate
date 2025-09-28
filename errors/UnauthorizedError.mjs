import { ApiError } from "./ApiError.mjs";

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}
