import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { getUserById } from "../models/userModel.mjs";
import { ACCESS_COOKIE_NAME } from "../utilities/cookieUtility.mjs";

const cookieExtractor = (req) => {
  let token = null;

  if (req?.cookies) {
    token = req.cookies[ACCESS_COOKIE_NAME];
  }

  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await getUserById(jwt_payload.sub);

    return user ? done(null, user) : done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

export default jwtStrategy;
