import type { User as PrismaUser } from "../../generated/prisma/index.js";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
    interface Request {
      user?: User;
    }
  }
}

export type Params = {
  id: string;
};

export type Query = {
  page?: string;
  limit?: string;
  sort?: "createdAt" | "updatedAt" | "title";
  order?: "asc" | "desc";
};
