import { Strategy as JwtStrategy } from "passport-jwt";

import { jwtOptions } from "#config/jwtConfig.mjs";
import { getUserById } from "#models/userModel.mjs";

export const jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await getUserById(jwt_payload.sub);

    return user ? done(null, user) : done(null, false);
  } catch (err) {
    return done(err, false);
  }
});
