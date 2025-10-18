import vine from "@vinejs/vine";

export const adminUserIdValidator = vine.compile(
  vine.object({
    id: vine.number().min(1),
  }),
);
