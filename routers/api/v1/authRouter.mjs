import { Router } from "express";

import { authController } from "#controllers/index.mjs";
import { authenticateJwt, isGuest } from "#middlewares/authMiddleware.mjs";

export const authRouter = Router();

authRouter.post("/register", isGuest, authController.postRegister);

authRouter.get("/register/activate", isGuest, authController.getActivateAccount);

authRouter.post("/register/resend-verification", isGuest, authController.postResendVerification);

authRouter.post("/login", isGuest, authController.postLogin);

authRouter.post("/forgot-password", isGuest, authController.postForgotPassword);

authRouter.post("/reset-password/reset", isGuest, authController.postResetPassword);

authRouter.post("/refresh-token", authController.postRefreshToken);

authRouter.post("/logout", authenticateJwt, authController.postLogout);
