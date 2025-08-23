import { Router } from "express";
import {
  postRegister,
  getRegisterActivate,
  postLogin,
  postForgotPassword,
  postResetPassword,
  postLogout,
} from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

authRouter.get("/register/activate", getRegisterActivate);

authRouter.post("/login", postLogin);

authRouter.post("/forgot-password", postForgotPassword);

authRouter.post("/reset-password/reset", postResetPassword);

authRouter.post("/logout", postLogout);

export default authRouter;
