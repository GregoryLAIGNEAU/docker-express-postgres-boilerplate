import { Router } from "express";
import {
  postRegister,
  getRegisterActivate,
  postLogin,
  postForgotPassword,
  getResetPassword,
  postResetPassword,
} from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

authRouter.get("/register/activate", getRegisterActivate);

authRouter.post("/login", postLogin);

authRouter.post("/forgot-password", postForgotPassword);

authRouter.get("/reset-password/reset", getResetPassword);

authRouter.post("/reset-password/reset", postResetPassword);

export default authRouter;
