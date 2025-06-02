import { Router } from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  getCommentsByPost,
  createComment,
} from "../controllers/posts.controller.js";
import { createPostSchema, createCommentSchema } from "../schema/index.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import validate from "../middleware/validate.middleware.js";

const postsRouter = Router();

postsRouter.get("/posts", getAllPosts);
postsRouter.get("/posts/:id", getPost);
postsRouter.post(
  "/posts",
  isAuthenticated,
  validate(createPostSchema),
  createPost
);
postsRouter.get("/posts/:id/comments", getCommentsByPost);
postsRouter.post(
  "/posts/:id/comments",
  isAuthenticated,
  validate(createCommentSchema),
  createComment
);

export default postsRouter;
