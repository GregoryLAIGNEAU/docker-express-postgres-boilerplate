import { Strategy as JwtStrategy } from "passport-jwt";

import { jwtConfig } from "#config/jwtConfig.mjs";
import { userModel } from "#models/index.mjs";

export const jwtStrategy = new JwtStrategy(jwtConfig, async (jwt_payload, done) => {
  try {
    const user = await userModel.getUserById(jwt_payload.sub);

    return user ? done(null, user) : done(null, false);
  } catch (err) {
    return done(err, false);
  }
});
