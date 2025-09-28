import { ApiError } from "#errors/indexError.mjs";

export const errorHandlerMiddleware = (err, _req, res, _next) => {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: "Something went wrong, please try again later.",
  });
};
