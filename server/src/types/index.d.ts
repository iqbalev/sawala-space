import type { User as PrismaUser } from "../../generated/prisma/index.js";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
    interface Request {
      user?: User;
    }
  }
}
