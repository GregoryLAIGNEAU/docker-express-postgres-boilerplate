import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { RateLimiterMemory } from "rate-limiter-flexible";

import corsOptions from "./config/corsOptions.mjs";
import { doubleCsrfProtection } from "./middlewares/csrfMiddleware.mjs";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.mjs";
import morganMiddleware from "./middlewares/morganMiddleware.mjs";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.mjs";
import rateLimiterMiddleware from "./middlewares/rateLimiterMiddleware.mjs";
import passport from "passport";
import authRouter from "./routers/authRouter.mjs";
import csrfRouter from "./routers/csrfRouter.mjs";
import jwtStrategy from "./strategies/jwtStrategy.mjs";
import logger from "./utils/loggerUtil.mjs";

const app = express();

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

passport.use(jwtStrategy);

app.use("/csrf-token", csrfRouter);
app.use(doubleCsrfProtection);
app.use(rateLimiterMiddleware);

app.use("/", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
