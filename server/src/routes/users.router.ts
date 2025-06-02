import { Router } from "express";
import {
  getProfile,
  getPostsByUser,
  getCommentsByUser,
  updateUserName,
  updateUserBio,
  updateUserPassword,
  deleteUser,
} from "../controllers/users.controller.js";
import { nameSchema, bioSchema, passwordSchema } from "../schema/index.js";
import isOptionallyAuthenticated from "../middleware/isOptionallyAuthenticated.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isOwner from "../middleware/isOwner.js";
import validate from "../middleware/validate.middleware.js";

const usersRouter = Router();

usersRouter.get("/users/:id", isOptionallyAuthenticated, getProfile);
usersRouter.get("/users/:id/posts", getPostsByUser);
usersRouter.get("/users/:id/comments", getCommentsByUser);
usersRouter.patch(
  "/users/:id/name",
  isAuthenticated,
  isOwner,
  validate(nameSchema),
  updateUserName
);
usersRouter.patch(
  "/users/:id/bio",
  isAuthenticated,
  isOwner,
  validate(bioSchema),
  updateUserBio
);
usersRouter.patch(
  "/users/:id/password",
  isAuthenticated,
  isOwner,
  validate(passwordSchema),
  updateUserPassword
);
usersRouter.delete("/users/:id", isAuthenticated, isOwner, deleteUser);

export default usersRouter;
