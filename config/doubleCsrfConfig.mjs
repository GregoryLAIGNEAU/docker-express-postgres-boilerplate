import jwt from "jsonwebtoken";

import { ACCESS_COOKIE_NAME, X_CSRF_TOKEN_COOKIE_NAME } from "#constants/cookieConstant.mjs";
import { SECURITY_ENV } from "./envConfig.mjs";
import { TOKEN_CONFIG } from "./tokenConfig.mjs";

export const doubleCsrfConfig = {
  getSecret: () => TOKEN_CONFIG.CSRF_SECRET,
  getSessionIdentifier: (req) => {
    const token = req.cookies?.[ACCESS_COOKIE_NAME];
    const decoded = jwt.verify(token, TOKEN_CONFIG.ACCESS_TOKEN_SECRET);

    return decoded.sid;
  },
  cookieName: X_CSRF_TOKEN_COOKIE_NAME,
  cookieOptions: {
    secure: SECURITY_ENV.COOKIE_SECURE,
  },
  getTokenFromRequest: (req) => {
    if (req.is("application/x-www-form-urlencoded")) {
      return req.body._csrf;
    }

    return req.headers["x-csrf-token"];
  },
};
