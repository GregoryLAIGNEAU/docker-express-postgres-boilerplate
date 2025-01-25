import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.mjs";

const app = express();

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
