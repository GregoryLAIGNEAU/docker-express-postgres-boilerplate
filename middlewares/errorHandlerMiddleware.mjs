import { AppError } from "../errors/indexError.mjs";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: "Something went wrong, please try again later.",
  });
};

export default errorHandlerMiddleware;
