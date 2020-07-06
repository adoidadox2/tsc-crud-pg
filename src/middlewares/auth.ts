import { promisify } from "util";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
  id: String;
  iat: Number;
  exp: Number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, "tsc");

    const { id } = decoded as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
