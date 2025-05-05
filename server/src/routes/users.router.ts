import { Router } from "express";
import isOptionallyAuthenticated from "../middleware/isOptionallyAuthenticated.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isOwner from "../middleware/isOwner.js";
import validate from "../middleware/validate.middleware.js";
import { nameSchema, passwordSchema, bioSchema } from "../schema/index.js";
import {
  getProfileById,
  deleteProfileById,
  updateNameById,
  updatePasswordById,
  updateBioById,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/:id", isOptionallyAuthenticated, getProfileById);
usersRouter.delete("/users/:id", isAuthenticated, isOwner, deleteProfileById);
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

export default usersRouter;
