import { Router } from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../../../controllers/userController.mjs";
import jwtAuthMiddleware from "../../../middlewares/jwtAuthMiddleware.mjs";

const userRouter = Router();

userRouter.get("/me", jwtAuthMiddleware, getUser);

userRouter.patch("/me", jwtAuthMiddleware, updateUser);

userRouter.delete("/me", jwtAuthMiddleware, deleteUser);

export default userRouter;
