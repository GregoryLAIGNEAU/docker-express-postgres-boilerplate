import { Router } from "express";
import { userController } from "#controllers/index.mjs";
import jwtAuthMiddleware from "#middlewares/jwtAuthMiddleware.mjs";

const userRouter = Router();

userRouter.get("/me", jwtAuthMiddleware, userController.getUser);

userRouter.patch("/me", jwtAuthMiddleware, userController.updateUser);

userRouter.delete("/me", jwtAuthMiddleware, userController.deleteUser);

export default userRouter;
