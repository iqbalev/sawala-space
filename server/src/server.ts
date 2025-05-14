import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import usersRouter from "./routes/users.router.js";
import postsRouter from "./routes/posts.router.js";

const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use("/api", authRouter);
server.use("/api", usersRouter);
server.use("/api", postsRouter);

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
