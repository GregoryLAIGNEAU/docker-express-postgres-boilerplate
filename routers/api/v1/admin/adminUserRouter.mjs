import { Router } from "express";

import { ROLE } from "#constants/roleConstant.mjs";
import { adminUserController } from "#controllers/admin/index.mjs";
import { authenticateJwt, authorizeRole } from "#middlewares/authMiddleware.mjs";

export const adminUserRouter = Router();

adminUserRouter.get("/", authenticateJwt, authorizeRole(ROLE.admin), adminUserController.getUsers);