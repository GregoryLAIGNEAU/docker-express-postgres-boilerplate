import jwt from "jsonwebtoken";

import { ACCESS_COOKIE_NAME, X_CSRF_TOKEN_COOKIE_NAME } from "#constants/cookieConstant.mjs";
import { isProduction } from "#utilities/envUtility.mjs";
import { CSRF_SECRET } from "./envConfig.mjs";
import { ACCESS_TOKEN_SECRET } from "./tokenConfig.mjs";

export const doubleCsrfOptions = {
  getSecret: () => CSRF_SECRET,
  getSessionIdentifier: (req) => {
    const token = req.cookies?.[ACCESS_COOKIE_NAME];
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    return decoded.sid;
  },
  cookieName: X_CSRF_TOKEN_COOKIE_NAME,
  cookieOptions: {
    secure: isProduction,
  },
  getTokenFromRequest: (req) => {
    if (req.is("application/x-www-form-urlencoded")) {
      return req.body._csrf;
    }

    return req.headers["x-csrf-token"];
  },
};
