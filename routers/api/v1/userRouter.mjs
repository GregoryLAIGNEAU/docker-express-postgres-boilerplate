import { Router } from "express";
import { getUser } from "../../../controllers/userController.mjs";
import jwtAuthMiddleware from "../../../middlewares/jwtAuthMiddleware.mjs";

const userRouter = Router();

userRouter.get("/me", jwtAuthMiddleware, getUser);

export default userRouter;
