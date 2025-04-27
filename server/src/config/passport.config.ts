import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../lib/index.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const localStrategyOptions = {
  usernameField: "email",
};

passport.use(
  new LocalStrategy(localStrategyOptions, async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return done(null, false, {
          message: "Invalid email or password. Please try again.",
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, {
          message: "Invalid email or password. Please try again.",
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

const jwtStrategyOptions = {
  secretOrKey: process.env.JWT_SECRET!,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtStrategyOptions, async (payload: { id: string }, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
