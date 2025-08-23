import { Router } from "express";
import { generateCsrfToken } from "../middlewares/csrfMiddleware.mjs";

const csrfRouter = Router();

csrfRouter.get("/", (req, res) => {
  const csrfToken = generateCsrfToken(req, res);

  res.json({ csrfToken });
});

export default csrfRouter;
