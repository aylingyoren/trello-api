import { Request, Response, NextFunction } from "express";

interface RequestWithRoles extends Request {
  roles: string[];
}

const verifyRoles = (...allowedRoles: string[]) => {
  return (req: RequestWithRoles, res: Response, next: NextFunction) => {
    if (!req?.roles) {
      return res.status(401).json({});
    }
    const rolesArray: string[] = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) {
      res.status(401).json({});
    }
    next();
  };
};

export default verifyRoles;
