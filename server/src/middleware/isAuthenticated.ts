import { Request, Response, NextFunction } from "express";
import passport from "../config/passport.config.js";
import { User } from "../../generated/prisma/index.js";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: unknown, user: User) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token. Please provide a valid one.",
        });
      }

      req.user = user;
      return next();
    }
  )(req, res, next);
};

export default isAuthenticated;
