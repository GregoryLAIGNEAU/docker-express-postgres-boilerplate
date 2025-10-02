import { Router } from "express";
import { userController } from "#controllers/index.mjs";
import { authenticateJwt } from "#middlewares/authMiddleware.mjs";

export const userRouter = Router();

userRouter.get("/me", authenticateJwt, userController.getUser);

userRouter.patch("/me", authenticateJwt, userController.updateUser);

userRouter.delete("/me", authenticateJwt, userController.deleteUser);
