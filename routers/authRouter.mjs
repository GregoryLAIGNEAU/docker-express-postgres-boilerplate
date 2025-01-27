import { Router } from "express";
import {
  postRegister,
  getRegisterActivate,
} from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

authRouter.get("/register/activate", getRegisterActivate);

export default authRouter;
