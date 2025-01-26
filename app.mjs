import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.mjs";
import authRouter from "./routers/authRouter.mjs";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.mjs";

const app = express();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRouter);

app.get("/trigger-500", (req, res, next) => {
  next(new NotFoundError());
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFoundMiddleware);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
