import ApiError from "./ApiError.mjs";

class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export default NotFoundError;
