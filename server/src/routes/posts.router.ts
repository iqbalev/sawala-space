import { Router } from "express";
import {
  getAllPosts,
  getCommentsById,
  createPost,
  createComment,
} from "../controllers/posts.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import validate from "../middleware/validate.middleware.js";
import { createPostSchema, createCommentSchema } from "../schema/index.js";

const postsRouter = Router();

postsRouter.get("/posts/", getAllPosts);
postsRouter.get("/posts/:id/comments", getCommentsById);
postsRouter.post(
  "/posts",
  isAuthenticated,
  validate(createPostSchema),
  createPost
);
postsRouter.post(
  "/posts/:id/comments",
  isAuthenticated,
  validate(createCommentSchema),
  createComment
);

export default postsRouter;
