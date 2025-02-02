import express from "express";
import { generateToken } from "../middlewares/csrfMiddleware.mjs";

const csrfRouter = express.Router();

csrfRouter.get("/", (req, res) => {
  const token = generateToken(req, res);

  res.json({ token });
});


export default csrfRouter;
