import { Response, NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Roles } from "../config/roles";

interface RequestWithParams extends Request {
  headers: {
    authorization?: string;
    Authorization?: string;
  };
  name: string;
  roles: Roles[];
}

const verifyJWT = (
  req: RequestWithParams,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string =
    req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.includes("Bearer ")) return res.sendStatus(401);
  const token: string = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded: JwtPayload) => {
      if (err) return res.sendStatus(403);
      const { name, roles } = decoded.userInfo;
      req.name = name;
      req.roles = roles;
      next();
    }
  );
};

export default verifyJWT;
