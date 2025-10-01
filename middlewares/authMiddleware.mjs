import passport from "passport";

import { ForbiddenError } from "#errors/ForbiddenError.mjs";
import { UnauthorizedError } from "#errors/UnauthorizedError.mjs";

export const jwtAuthMiddleware = passport.authenticate("jwt", { session: false });

export const authorizeRole =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.user?.role_id) {
      throw new UnauthorizedError("Authentication required.");
    }

    if (!allowedRoles.includes(req.user.role_id)) {
      throw new ForbiddenError("You do not have permission to access this resource.");
    }

    next();
  };
