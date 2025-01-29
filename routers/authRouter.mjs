import { Router } from "express";
import {
  postRegister,
  getRegisterActivate,
  postLogin,
  postForgotPassword
} from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

authRouter.get("/register/activate", getRegisterActivate);

authRouter.post("/login", postLogin);

authRouter.post('/forgot-password', postForgotPassword);

export default authRouter;
