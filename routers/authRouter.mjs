import { Router } from "express";
import {
  postRegister,
  getRegisterActivate,
  postLogin,
  postForgotPassword,
  postResetPassword,
  postLogout,
} from "../controllers/authController.mjs";
import jwtAuthMiddleware from "../middlewares/jwtAuthMiddleware.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

authRouter.get("/register/activate", getRegisterActivate);

authRouter.post("/login", postLogin);

authRouter.post("/forgot-password", postForgotPassword);

authRouter.post("/reset-password/reset", postResetPassword);

authRouter.post("/logout", jwtAuthMiddleware, postLogout);

export default authRouter;
