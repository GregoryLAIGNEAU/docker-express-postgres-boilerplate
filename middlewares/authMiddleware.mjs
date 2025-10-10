import jwt from "jsonwebtoken";
import passport from "passport";

import { TOKEN_CONFIG } from "#config/tokenConfig.mjs";
import { ACCESS_COOKIE_NAME } from "#constants/cookieConstant.mjs";
import { ForbiddenError } from "#errors/ForbiddenError.mjs";
import { UnauthorizedError } from "#errors/UnauthorizedError.mjs";

export const authenticateJwt = passport.authenticate("jwt", { session: false });

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

export const isGuest = (req, res, next) => {
  const accessToken = req.cookies?.[ACCESS_COOKIE_NAME];

  if (accessToken) {
    jwt.verify(accessToken, TOKEN_CONFIG.ACCESS_TOKEN_SECRET);
    return res.status(409).json({ message: "You are already logged in" });
  }

  next();
};
