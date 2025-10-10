import { CORS_CONFIG } from "./envConfig.mjs";

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || CORS_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type", "Accept"],
  credentials: true,
};
