import vine from "@vinejs/vine";
import { uniqueRule } from "./rules/unique.mjs";
import { emailSchema, nameSchema, passwordSchema } from "./shared/index.mjs";

export const registerValidator = vine.compile(
  vine.object({
    firstName: nameSchema.clone(),
    lastName: nameSchema.clone(),
    email: emailSchema
      .clone()
      .use(uniqueRule({ table: "auth.users", column: "email" })),
    password: passwordSchema.clone(),
  }),
);

export const loginValidator = vine.compile(
  vine.object({
    email: emailSchema.clone(),
    password: vine.string(),
  }),
);

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: emailSchema.clone(),
  }),
);

export const resetPasswordValidator = vine.compile(
  vine.object({
    email: emailSchema.clone(),
    password: passwordSchema.clone().confirmed({
      confirmationField: "confirmPassword",
    }),
    confirmPassword: passwordSchema.clone(),
  }),
);
