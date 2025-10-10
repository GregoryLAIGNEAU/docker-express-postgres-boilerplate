import postgres from "postgres";

import { dbOptions } from "#config/dbConfig.mjs";

export const sql = postgres(dbOptions);
