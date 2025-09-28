import express from "express";

import { generateCsrfToken } from "#middlewares/csrfMiddleware.mjs";

export const csrfRouter = express.Router();

csrfRouter.get("/", (req, res) => {
  const csrfToken = generateCsrfToken(req, res);

  res.json({ csrfToken });
});
