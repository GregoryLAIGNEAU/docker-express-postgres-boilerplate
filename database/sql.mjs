import postgres from "postgres";

import { dbConfig } from "#config/dbConfig.mjs";

export const sql = postgres (dbConfig);
