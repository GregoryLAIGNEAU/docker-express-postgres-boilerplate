export const nameSchema = vine
  .string()
  .trim()
  .regex(/^\p{L}+([\p{L}\s'-]*\p{L})?$/u)
  .minLength(1)
  .maxLength(50);