import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getUserById } from "../models/userModel.mjs";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken()
  ]),
  secretOrKey: process.env.JWT_SECRET,
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