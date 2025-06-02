import { Router } from "express";
import { signUpSchema, signInSchema } from "../schema/index.js";
import { signUp, signIn } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";

const authRouter = Router();

authRouter.post("/auth/sign-up", validate(signUpSchema), signUp);
authRouter.post("/auth/sign-in", validate(signInSchema), signIn);

export default authRouter;
