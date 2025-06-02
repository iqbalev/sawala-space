import type { Request, Response } from "express";
import type { Params } from "../types/index.js";
import type {
  NameReqBody,
  BioReqBody,
  PasswordReqBody,
} from "../schema/index.js";
import { prisma } from "../lib/index.js";
import bcrypt from "bcryptjs";

export const getProfile = async (
  req: Request<Params, {}, {}>,
  res: Response
) => {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!profile) {
      res.status(404).json({
        success: false,
        message: "Profile not found",
      });
      return;
    }

    // req.user is optionally set by isOptionallyAuthenticated middleware IF the user is signed in
    // Return full profile if user IS authenticated and it's theirs
    if (req.params.id === req.user?.id) {
      res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        user: profile,
      });
      return;
    }

    // Return public profile otherwise
    const { email, password, ...publicProfile } = profile;
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      user: publicProfile,
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

export const getPostsByUser = async (
  req: Request<Params, {}, {}>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const posts = await prisma.post.findMany({
      where: { authorId: req.params.id },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message:
        posts.length === 0
          ? "No posts found for this user"
          : "Posts retrieved successfully",
      posts,
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

export const getCommentsByUser = async (
  req: Request<Params, {}, {}>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const comments = await prisma.comment.findMany({
      where: { userId: req.params.id },
      include: {
        post: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message:
        comments.length === 0
          ? "No comments found for this user"
          : "Comments retrieved successfully",
      comments,
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

export const updateUserName = async (
  req: Request<Params, {}, NameReqBody>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
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
      message: "Name updated successfully",
      user: updatedUser,
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

export const updateUserBio = async (
  req: Request<Params, {}, BioReqBody>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
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
      message: "Bio updated successfully",
      user: updatedUser,
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

export const updateUserPassword = async (
  req: Request<Params, {}, PasswordReqBody>,
  res: Response
) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid current password",
      });
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
      message: "Password updated successfully",
      user: updatedUser,
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

export const deleteUser = async (
  req: Request<Params, {}, {}>,
  res: Response
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
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
