import { ExtractJwt } from "passport-jwt";

import { ACCESS_COOKIE_NAME } from "#constants/cookieConstant.mjs";

const cookieExtractor = (req) => {
  let token = null;

  if (req?.cookies) {
    token = req.cookies[ACCESS_COOKIE_NAME];
  }

  return token;
};

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};
