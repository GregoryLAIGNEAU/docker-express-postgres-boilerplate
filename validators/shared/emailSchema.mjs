export const emailSchema = vine.string().trim().email().normalizeEmail({
  all_lowercase: true,
  gmail_remove_dots: false,
  gmail_remove_subaddress: false,
  gmail_convert_googlemaildotcom: true,
});