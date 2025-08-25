import vine from "@vinejs/vine";
import { uniqueRule } from "./rules/unique.mjs";

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine
      .string()
      .trim()
      .regex(/^\p{L}+([\p{L}\s'-]*\p{L})?$/u)
      .minLength(1)
      .maxLength(50),
    lastName: vine
      .string()
      .trim()
      .regex(/^\p{L}+([\p{L}\s'-]*\p{L})?$/u)
      .minLength(1)
      .maxLength(50),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail({
        all_lowercase: true,
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
        gmail_convert_googlemaildotcom: true,
      })
      .use(uniqueRule({ table: "auth.users", column: "email" })),
    password: vine.string().minLength(12).maxLength(64),
  }),
);

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail({
      all_lowercase: true,
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      gmail_convert_googlemaildotcom: true,
    }),
    password: vine.string(),
  }),
);

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail({
      all_lowercase: true,
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      gmail_convert_googlemaildotcom: true,
    }),
  }),
);

export const resetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail({
      all_lowercase: true,
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
      gmail_convert_googlemaildotcom: true,
    }),
    password: vine.string().minLength(12).maxLength(64).confirmed({
      confirmationField: "confirmPassword",
    }),
    confirmPassword: vine.string().minLength(12).maxLength(64),
  }),
);
