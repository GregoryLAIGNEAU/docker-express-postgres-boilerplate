import { Router } from "express";
import {
  postRegister,
  getRegisterActivate,
  postLogin,
} from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

authRouter.get("/register/activate", getRegisterActivate);

authRouter.post("/login", postLogin);

export default authRouter;
