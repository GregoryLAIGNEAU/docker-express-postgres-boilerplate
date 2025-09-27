import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";

import corsOptions from "#config/corsOptions.mjs";
import { doubleCsrfProtection } from "#middlewares/csrfMiddleware.mjs";
import errorHandlerMiddleware from "#middlewares/errorHandlerMiddleware.mjs";
import morganMiddleware from "#middlewares/morganMiddleware.mjs";
import notFoundMiddleware from "#middlewares/notFoundMiddleware.mjs";
import rateLimiterMiddleware from "#middlewares/rateLimiterMiddleware.mjs";
import authRouter from "#routers/api/v1/authRouter.mjs";
import csrfRouter from "#routers/api/v1/csrfRouter.mjs";
import jwtStrategy from "#strategies/jwtStrategy.mjs";
import logger from "#utilities/loggerUtility.mjs";
import { isProduction } from "#utilities/envUtility.mjs";
import userRouter from "#routers/api/v1/userRouter.mjs";
import { csrfErrorHandlerMiddleware } from "#middlewares/csrfErrorHandlerMiddleware.mjs";

const app = express();

isProduction ? app.set("trust proxy", 1) : app.set("trust proxy", false);

app.use(
  helmet({
    xPoweredBy: false,
  }),
);
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(morganMiddleware);
app.use(rateLimiterMiddleware);

passport.use(jwtStrategy);

app.use("/api/v1", authRouter);
app.use("/api/v1/csrf-token", csrfRouter);
app.use(doubleCsrfProtection);

app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(csrfErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
