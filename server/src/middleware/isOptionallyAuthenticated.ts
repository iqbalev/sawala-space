import { Request, Response, NextFunction } from "express";
import passport from "../config/passport.config.js";
import { User } from "../../generated/prisma/index.js";

const isOptionallyAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: unknown, user: User) => {
      if (err) return next(err);
      if (user) {
        req.user = user;
      }

      return next();
    }
  )(req, res, next);
};

export default isOptionallyAuthenticated;
