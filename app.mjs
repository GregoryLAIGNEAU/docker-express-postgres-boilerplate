import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";

import { corsOptions } from "#config/corsOptions.mjs";
import { APP_CONFIG } from "#config/envConfig.mjs";
import { csrfErrorHandler } from "#middlewares/csrfErrorHandlerMiddleware.mjs";
import { doubleCsrfProtection } from "#middlewares/csrfMiddleware.mjs";
import { errorHandler } from "#middlewares/errorHandlerMiddleware.mjs";
import { httpLogger } from "#middlewares/morganMiddleware.mjs";
import { notFound } from "#middlewares/notFoundMiddleware.mjs";
import { rateLimiter } from "#middlewares/rateLimiterMiddleware.mjs";
import { authRouter } from "#routers/api/v1/authRouter.mjs";
import { csrfRouter } from "#routers/api/v1/csrfRouter.mjs";
import { userRouter } from "#routers/api/v1/userRouter.mjs";
import { jwtStrategy } from "#strategies/jwtStrategy.mjs";
import { isProduction } from "#utilities/envUtility.mjs";
import { logger } from "#utilities/loggerUtility.mjs";

const app = express();

isProduction ? app.set("trust proxy", 1) : app.set("trust proxy", false);

app.use(helmet({ xPoweredBy: false }));
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(httpLogger);
app.use(rateLimiter);

passport.use(jwtStrategy);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/csrf-token", csrfRouter);
app.use(doubleCsrfProtection);
app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(csrfErrorHandler);
app.use(errorHandler);

app.listen(APP_CONFIG.PORT, () => {
  logger.info(`Server is running on http://localhost:${APP_CONFIG.PORT}`);
});
