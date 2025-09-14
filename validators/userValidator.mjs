import vine from "@vinejs/vine";
import { uniqueRule } from "./rules/unique.mjs";
import { emailSchema, nameSchema } from "./shared/index.mjs";

export const updateUserValidator = vine.compile(
  vine.object({
    firstname: nameSchema.clone().optional(),
    lastname: nameSchema.clone().optional(),
    email: emailSchema
      .clone()
      .optional()
      .use(uniqueRule({ table: "auth.users", column: "email" })),
  }),
);
