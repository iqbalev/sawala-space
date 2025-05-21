import { Request, Response } from "express";
import { Query, Params } from "../types/index.js";
import { prisma } from "../lib/index.js";
import { CreatePostReqBody, CreateCommentReqBody } from "../schema/index.js";

export const getAllPosts = async (
  req: Request<{}, {}, {}, Query>,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  if (page < 1 || limit < 1) {
    res
      .status(400)
      .json({
        success: false,
        message: "Page and limit query parameters must be positive numbers",
      });

    return;
  }

  const offset = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    });

    const totalPosts = await prisma.post.count();

    res.status(200).json({
      success: true,
      message:
        posts.length === 0
          ? "There are no posts available"
          : "All posts successfully retrieved",
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      totalPosts,
      posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const getCommentsById = async (
  req: Request<Params, {}, {}>,
  res: Response
) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      res.status(404).json({ success: false, message: "Post is not found" });
      return;
    }

    const comments = await prisma.comment.findMany({
      where: { postId: req.params.id },
      include: { user: { select: { name: true } } },
    });

    res.status(200).json({
      success: true,
      message:
        comments.length === 0
          ? "This post has no comment(s) yet"
          : "Comment(s) successfully retrieved",
      comments,
    });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const createPost = async (
  req: Request<{}, {}, CreatePostReqBody>,
  res: Response
) => {
  try {
    const { title, content, published } = req.body;
    const post = await prisma.post.create({
      data: { authorId: req.user!.id, title, content, published }, // (!) used because req.user is guaranteed by the isAuthenticated middleware
    });

    res
      .status(201)
      .json({ success: true, message: "Post successfully created", post });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const createComment = async (
  req: Request<Params, {}, CreateCommentReqBody>,
  res: Response
) => {
  try {
    const posts = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!posts) {
      res.status(404).json({ success: false, message: "Post is not found" });
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
      message: "Comment successfully created",
      comment,
    });

    return;
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
