import { isProduction } from "../utils/envUtil.mjs";

const doubleCsrfOptions = {
  getSecret: () => process.env.CSRF_SECRET,
  cookieName: isProduction ? "__Host-psifi.x-csrf-token" : "x-csrf-token",
  cookieOptions: {
    secure: isProduction,
  },
};

export default doubleCsrfOptions;
