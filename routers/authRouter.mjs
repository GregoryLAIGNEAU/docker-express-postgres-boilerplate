import { Router } from "express";
import {
  postRegister,
  getRegisterActivate,
  postLogin,
  postForgotPassword,
  getResetPassword,
} from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

authRouter.get("/register/activate", getRegisterActivate);

authRouter.post("/login", postLogin);

authRouter.post("/forgot-password", postForgotPassword);

authRouter.get("/reset-password/reset", getResetPassword);

export default authRouter;
