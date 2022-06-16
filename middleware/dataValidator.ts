import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import logger from "../config/logger";

const dataValidator = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid: boolean = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message: string = details.map((i) => i.message).join(", ");

      logger.error("error", message);
      res.status(422).json({ error: message });
    }
  };
};
export default dataValidator;
