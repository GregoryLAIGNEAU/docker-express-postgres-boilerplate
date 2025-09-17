import vine from "@vinejs/vine";
import sql from "../../database/sql.mjs";

async function unique(value, options, field) {
  if (typeof value !== "string") {
    return;
  }

  const { table, column, exclude } = options;
  const excludeValue = field.meta?.[exclude?.value];

  const [row] = await sql`
    SELECT ${sql(column)}
    FROM ${sql(table)}
    WHERE ${sql(column)} = ${value}
      ${exclude ? sql`AND ${sql(exclude.column)} != ${excludeValue}` : sql``}
    LIMIT 1
  `;

  if (row) {
    field.report("The {{ field }} field is not unique", "unique", field);
  }
}

export const uniqueRule = vine.createRule(unique);
