import postgres from "postgres";
import dbOptions from "#config/dbOptions.mjs";

const sql = postgres(dbOptions);

export default sql;
