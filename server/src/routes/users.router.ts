import { Router } from "express";
import isOptionallyAuthenticated from "../middleware/isOptionallyAuthenticated.js";
import {
  getProfileById,
  getPostsById,
  getCommentsById,
  updateNameById,
  updatePasswordById,
  updateBioById,
  deleteProfileById,
} from "../controllers/users.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isOwner from "../middleware/isOwner.js";
import validate from "../middleware/validate.middleware.js";
import { nameSchema, passwordSchema, bioSchema } from "../schema/index.js";

const usersRouter = Router();

usersRouter.get("/users/:id", isOptionallyAuthenticated, getProfileById);
usersRouter.get("/users/:id/posts", getPostsById);
usersRouter.get("/users/:id/comments", getCommentsById);
usersRouter.patch(
  "/users/:id/name",
  isAuthenticated,
  isOwner,
  validate(nameSchema),
  updateNameById
);

usersRouter.patch(
  "/users/:id/password",
  isAuthenticated,
  isOwner,
  validate(passwordSchema),
  updatePasswordById
);

usersRouter.patch(
  "/users/:id/bio",
  isAuthenticated,
  isOwner,
  validate(bioSchema),
  updateBioById
);

usersRouter.delete("/users/:id", isAuthenticated, isOwner, deleteProfileById);

export default usersRouter;
