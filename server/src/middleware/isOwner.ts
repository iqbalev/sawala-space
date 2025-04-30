import { Request, Response, NextFunction } from "express";

const isOwner = (req: Request, res: Response, next: NextFunction) => {
  const authenticatedId = req.user?.id;
  const paramsId = req.params.id;
  if (authenticatedId !== paramsId) {
    res.status(403).json({
      success: false,
      message: "You are not allowed to access this resource.",
    });

    return;
  }

  return next();
};

export default isOwner;
