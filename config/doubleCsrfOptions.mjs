import { isProduction } from "../utils/envUtil.mjs";
import jwt from "jsonwebtoken";

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
};

export default doubleCsrfOptions;
