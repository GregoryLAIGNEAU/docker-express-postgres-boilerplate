import jwt from "jsonwebtoken";
import { isProduction } from "../utilities/envUtility.mjs";

const doubleCsrfOptions = {
  getSecret: () => process.env.CSRF_SECRET,
  getSessionIdentifier: (req) => {
    const token = req.cookies?.access_token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.sid;
  },
  cookieName: isProduction ? "__Host-psifi.x-csrf-token" : "x-csrf-token",
  cookieOptions: {
    secure: isProduction,
  },
  getTokenFromRequest: (req) => {
    if (req.is('application/x-www-form-urlencoded')) {
      return req.body._csrf;
    }

    return req.headers['x-csrf-token'];
  }
};

export default doubleCsrfOptions;
