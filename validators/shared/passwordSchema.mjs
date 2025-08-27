import vine from "@vinejs/vine";

export const passwordSchema = vine.string().minLength(12).maxLength(64);
