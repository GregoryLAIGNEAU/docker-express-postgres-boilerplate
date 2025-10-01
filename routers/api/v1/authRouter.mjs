import { Router } from "express";
import { authController } from "#controllers/index.mjs";
import { jwtAuthMiddleware } from "#middlewares/authMiddleware.mjs";

export const authRouter = Router();

authRouter.post("/register", authController.postRegister);

authRouter.get("/register/activate", authController.getActivateAccount);

authRouter.post("/register/resend-verification", authController.postResendVerification);

authRouter.post("/login", authController.postLogin);

authRouter.post("/forgot-password", authController.postForgotPassword);

authRouter.post("/reset-password/reset", authController.postResetPassword);

authRouter.post("/refresh-token", authController.postRefreshToken);

authRouter.post("/logout", jwtAuthMiddleware, authController.postLogout);
