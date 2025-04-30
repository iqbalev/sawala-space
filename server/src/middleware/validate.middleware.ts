import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        errors: validationResult.error,
      });

      return;
    }

    return next();
  };
};

export default validate;
