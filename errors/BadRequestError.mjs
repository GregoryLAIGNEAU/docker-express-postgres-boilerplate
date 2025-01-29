import ApiError from "./ApiError.mjs";

class BadRequestError extends ApiError {
  constructor(message = "Oops! Something went wrong with your request!") {
    super(message, 400);
  }
}

export default BadRequestError;
