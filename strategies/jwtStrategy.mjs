import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findById } from "../models/userModel.mjs";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await findById(jwt_payload.sub);

    return user ? done(null, user) : done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

export default jwtStrategy;
