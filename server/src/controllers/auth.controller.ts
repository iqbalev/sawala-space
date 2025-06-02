import type { Request, Response, NextFunction } from "express";
import type { SignUpReqBody, SignInReqBody } from "../schema/index.js";
import type { User } from "../../generated/prisma/index.js";
import { prisma } from "../lib/index.js";
import bcrypt from "bcryptjs";
import passport from "../config/passport.config.js";
import jwt from "jsonwebtoken";

export const signUp = async (
  req: Request<{}, {}, SignUpReqBody>,
  res: Response
) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Email is already taken",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export const signIn = async (
  req: Request<{}, {}, SignInReqBody>,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: unknown, user: User, info: { message: string }) => {
      if (err) return next(err);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: info.message,
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      // Exclude password from user object
      const { password, ...userWithoutPassword } = user;

      return res.status(200).json({
        success: true,
        message: "User signed in successfully",
        token,
        user: userWithoutPassword,
      });
    }
  )(req, res, next);
};
