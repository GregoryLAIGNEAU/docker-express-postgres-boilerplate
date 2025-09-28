import { ApiError } from "./ApiError.mjs";

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}
