import { Request, Response } from "express";
import { prisma } from "../lib/index.js";
import bcrypt from "bcryptjs";

export const getProfileById = async (req: Request, res: Response) => {
  const paramsId = req.params.id;
  const authenticatedId = req.user?.id; // ID of authenticated user if exists (passed from prev middleware), undefined otherwise
  try {
    const user = await prisma.user.findUnique({ where: { id: paramsId } });
    if (!user) {
      res.status(404).json({ success: false, message: "User is not found" });
      return;
    }

    // Return full profile if user IS authenticated and it's theirs
    if (paramsId === authenticatedId) {
      res.status(200).json({
        success: true,
        message: "User details successfully retrieved",
        user,
      });

      return;

      // Return public profile only otherwise
    } else {
      const { id, email, password, ...publicProfile } = user;
      res.status(200).json({
        success: true,
        message: "User details successfully retrieved",
        user: publicProfile,
      });

      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const deleteProfileById = async (req: Request, res: Response) => {
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

export const updateNameById = async (req: Request, res: Response) => {
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

    await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name: req.body.newName,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Name successfully updated" });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const updatePasswordById = async (req: Request, res: Response) => {
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
    await prisma.user.update({
      where: { id: req.params.id },
      data: {
        password: hashedPassword,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Password successfully updated" });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const updateBioById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });

    if (!user) {
      res.status(404).json({ success: false, message: "User is not found" });
      return;
    }

    await prisma.user.update({
      where: { id: req.params.id },
      data: { bio: req.body.bio },
    });

    res
      .status(200)
      .json({ success: true, message: "Bio successfully updated" });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
