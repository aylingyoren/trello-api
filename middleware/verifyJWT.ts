import { Response, NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserDatabase } from "../config/UserDatabase";
import { UserPG } from "../databases/UserPG";
import { Roles } from "../config/roles";

const dbClass = new UserDatabase(new UserPG());

interface RequestWithParams extends Request {
  headers: {
    authorization?: string;
    Authorization?: string;
  };
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
  if (!token) return res.status(401).json({ message: "No authorization." });
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded: JwtPayload) => {
      if (err) return res.sendStatus(403);
      const { roles } = decoded.userInfo;
      const user = await dbClass.findUserByToken(token);
      if (!user) return res.status(403).json({ message: "Please log in." });
      req.roles = roles;
      next();
    }
  );
};

export default verifyJWT;
