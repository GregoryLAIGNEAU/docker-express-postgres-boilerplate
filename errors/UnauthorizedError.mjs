import ApiError from "./ApiError.mjs";

class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export default UnauthorizedError;
