import ApiError from "./ApiError.mjs";

class ForbiddenError extends ApiError {
  constructor(message = "Invalid CSRF token") {
    super(message, 403);
  }
}

export default ForbiddenError;