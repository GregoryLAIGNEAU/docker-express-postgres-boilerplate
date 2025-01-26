import { Router } from "express";
import { postRegister } from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post("/register", postRegister);

export default authRouter;
