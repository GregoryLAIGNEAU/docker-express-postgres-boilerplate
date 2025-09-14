import { Router } from "express";
import { getUser, updateUser } from "../../../controllers/userController.mjs";
import jwtAuthMiddleware from "../../../middlewares/jwtAuthMiddleware.mjs";

const userRouter = Router();

userRouter.get("/me", jwtAuthMiddleware, getUser);

userRouter.patch("/me", jwtAuthMiddleware, updateUser);

export default userRouter;
