import postgres from "postgres";

import { dbOptions } from "#config/dbOptions.mjs";

export const sql = postgres(dbOptions);
