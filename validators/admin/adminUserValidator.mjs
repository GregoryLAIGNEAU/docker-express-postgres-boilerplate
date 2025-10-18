import vine from "@vinejs/vine";

import { ACCOUNT_STATUS } from "#constants/accountStatusConstant.mjs";
import { ROLE } from "#constants/roleConstant.mjs";
import { uniqueRule } from "#validators/rules/unique.mjs";
import { emailSchema, nameSchema } from "#validators/shared/index.mjs";

export const adminUserIdValidator = vine.compile(
  vine.object({
    id: vine.number().min(1),
  }),
);

export const adminUpdateUserValidator = vine.compile(
  vine.object({
    firstname: nameSchema.clone().optional(),
    lastname: nameSchema.clone().optional(),
    email: emailSchema
      .clone()
      .optional()
      .use(
        uniqueRule({
          table: "auth.users",
          column: "email",
          exclude: { column: "id", value: "userId" },
        }),
      ),
    account_status_id: vine.number().in(Object.values(ACCOUNT_STATUS)).optional(),
    role_id: vine.number().in(Object.values(ROLE)).optional(),
  }),
);
