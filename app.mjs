import express from "express";
import cors from "cors";

import corsOptions from "./config/corsOptions.mjs";
import logger from "./utils/loggerUtil.mjs";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.mjs";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.mjs";
import authRouter from "./routers/authRouter.mjs";
import passport from "passport";
import jwtStrategy from "./strategies/jwtStrategy.mjs";

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

passport.use(jwtStrategy);

app.use("/", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
