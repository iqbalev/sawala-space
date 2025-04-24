import { Request, Response } from "express";
import { SignUpFormData, SignInFormData } from "../schema/index.js";
import { prisma } from "../lib/index.js";
import bcrypt from "bcryptjs";

export const signUp = async (
  req: Request<{}, {}, SignUpFormData>,
  res: Response
) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: "Email is already taken" });
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
      message: "Account created successfully.",
    });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const signIn = async (
  req: Request<{}, {}, SignInFormData>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      res.status(400).json({
        success: false,
        message: "Incorrect email or password. Please try again.",
      });
      return;
    }
    res.status(200).json({ success: true, message: "Sign in success" });
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
