import vine from "@vinejs/vine";
import sql from "../../database/sql.mjs";

async function unique(value, options, field) {
  if (typeof value !== "string") {
    return;
  }

  const rows = await sql`
    SELECT ${sql(options.column)}
    FROM ${sql(options.table)}
    WHERE ${sql(options.column)} = ${value}
    LIMIT 1
  `;

  if (rows.length > 0) {
    field.report("The {{ field }} field is not unique", "unique", field);
  }
}

export const uniqueRule = vine.createRule(unique);