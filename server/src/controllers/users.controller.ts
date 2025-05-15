import { Request, Response } from "express";
import { Params } from "../types/index.js";
import { prisma } from "../lib/index.js";
import { NameReqBody, PasswordReqBody, BioReqBody } from "../schema/index.js";
import bcrypt from "bcryptjs";

export const getProfileById = async (
  req: Request<Params, {}, {}>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User is not found" });
      return;
    }

    // req.user is optionally set by isOptionallyAuthenticated middleware IF the user is signed in
    if (req.params.id === req.user?.id) {
      // Return full profile if user IS authenticated and it's theirs
      res.status(200).json({
        success: true,
        message: "User profiles successfully retrieved",
        user,
      });

      return;
    } else {
      const { email, password, ...publicProfile } = user;
      // Return public profile only otherwise
      res.status(200).json({
        success: true,
        message: "User profiles successfully retrieved",
        user: publicProfile,
      });

      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const deleteProfileById = async (
  req: Request<Params, {}, {}>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User is not found" });
      return;
    }

    await prisma.user.delete({ where: { id: req.params.id } });
    res
      .status(200)
      .json({ success: true, message: "Account successfully deleted" });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const updateNameById = async (
  req: Request<Params, {}, NameReqBody>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User is not found" });
      return;
    }

    if (req.body.newName === user.name) {
      res.status(400).json({
        success: false,
        message: "New name must be different from current name",
      });

      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name: req.body.newName,
      },
      select: {
        id: true,
        name: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Name successfully updated",
      user: updatedUser,
    });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const updatePasswordById = async (
  req: Request<Params, {}, PasswordReqBody>,
  res: Response
) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User is not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      res
        .status(400)
        .json({ success: false, message: "Invalid current password" });

      return;
    }

    const sameNewPassword = await bcrypt.compare(newPassword, user.password);
    if (sameNewPassword) {
      res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });

      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Password successfully updated",
      user: updatedUser,
    });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const updateBioById = async (
  req: Request<Params, {}, BioReqBody>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User is not found" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: { bio: req.body.bio },
      select: {
        id: true,
        name: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Bio successfully updated",
      user: updatedUser,
    });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
