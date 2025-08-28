import { Router } from "express";
import {
  postRegister,
  getActivateAccount,
  postLogin,
  postForgotPassword,
  postResetPassword,
  postLogout,
  postRefreshToken
} from "../../../controllers/authController.mjs";
import jwtAuthMiddleware from "../../../middlewares/jwtAuthMiddleware.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

authRouter.get("/register/activate", getActivateAccount);

authRouter.post("/login", postLogin);

authRouter.post("/forgot-password", postForgotPassword);

authRouter.post("/reset-password/reset", postResetPassword);

authRouter.post("/refresh-token", postRefreshToken);

authRouter.post("/logout", jwtAuthMiddleware, postLogout);

export default authRouter;
