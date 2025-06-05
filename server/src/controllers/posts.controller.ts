import type { Request, Response } from "express";
import type { Query, Params } from "../types/index.js";
import type {
  CreatePostReqBody,
  CreateCommentReqBody,
} from "../schema/index.js";
import { prisma } from "../lib/index.js";

export const getAllPosts = async (
  req: Request<{}, {}, {}, Query>,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";
  const allowedSort = ["createdAt", "updatedAt", "title"];
  const allowedOrder = ["asc", "desc"];

  if (page < 1 || limit < 1) {
    res.status(400).json({
      success: false,
      message: "Page and limit parameters must be positive numbers",
    });
    return;
  }

  if (!allowedSort.includes(sort)) {
    res.status(400).json({
      success: false,
      message: "Sort parameter must be one of createdAt, updatedAt, or title",
    });
    return;
  }

  if (!allowedOrder.includes(order)) {
    res.status(400).json({
      success: false,
      message: "Order parameter must be asc or desc",
    });
    return;
  }

  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: { [sort]: order },
    });

    const totalPosts = await prisma.post.count({
      where: { published: true },
    });

    res.status(200).json({
      success: true,
      message:
        posts.length === 0
          ? "No posts found"
          : "All posts retrieved successfully",
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      totalPosts,
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

export const getPost = async (req: Request<Params, {}, {}>, res: Response) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    const { _count, ...postWithoutCount } = post;

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      post: {
        ...postWithoutCount,
        totalComments: _count.comments,
      },
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

export const createPost = async (
  req: Request<{}, {}, CreatePostReqBody>,
  res: Response
) => {
  try {
    const { title, content, category, published } = req.body;

    const post = await prisma.post.create({
      data: {
        authorId: req.user!.id, // (!) used because req.user is guaranteed by the isAuthenticated middleware
        title,
        content,
        category,
        published,
      },
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
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

export const getCommentsByPost = async (
  req: Request<Params, {}, {}, Query>,
  res: Response
) => {
  const sort = req.query.sort || "createdAt";
  const order = req.query.order || "desc";
  const allowedSort = ["createdAt", "updatedAt"];
  const allowedOrder = ["asc", "desc"];

  if (!allowedSort.includes(sort)) {
    res.status(400).json({
      success: false,
      message: "Sort parameter must be createdAt or updatedAt",
    });
  }

  if (!allowedOrder.includes(order)) {
    res.status(400).json({
      success: false,
      message: "Order parameter must be asc or desc",
    });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    const comments = await prisma.comment.findMany({
      where: { postId: req.params.id },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { [sort]: order },
    });

    res.status(200).json({
      success: true,
      message:
        comments.length === 0
          ? "No comments found for this post"
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

export const createComment = async (
  req: Request<Params, {}, CreateCommentReqBody>,
  res: Response
) => {
  try {
    const posts = await prisma.post.findUnique({
      where: { id: req.params.id },
    });

    if (!posts) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    const comment = await prisma.comment.create({
      data: {
        userId: req.user!.id, // (!) used because req.user is guaranteed by the isAuthenticated
        postId: req.params.id,
        content: req.body.content,
      },
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment,
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
