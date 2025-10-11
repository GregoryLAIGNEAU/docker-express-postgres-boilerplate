import { ExtractJwt } from "passport-jwt";

import { TOKEN_CONFIG } from "#config/tokenConfig.mjs";
import { ACCESS_COOKIE_NAME } from "#constants/cookieConstant.mjs";

const cookieExtractor = (req) => {
  let token = null;

  if (req?.cookies) {
    token = req.cookies[ACCESS_COOKIE_NAME];
  }

  return token;
};

export const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: TOKEN_CONFIG.ACCESS_TOKEN_SECRET,
};
