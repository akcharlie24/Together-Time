import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

interface Payload extends DefaultJwtPayload {
  userId: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const JWT_SECRET: string = process.env.JWT_SECRET!;

    if (!req.cookies.Authentication) {
      res.status(403).json({ message: "Auth Token Missing, No cookie sent" });
      return;
    }

    const authToken = req.cookies.Authentication;

    const data = jwt.verify(authToken, JWT_SECRET) as Payload;

    if (!data) {
      throw new Error("Corrupted Payload in JWT");
    }

    req.userId = data.userId;
    next();
  } catch (e: any) {
    res.status(403).json({ message: "Access Denied", error: e.message });
    return;
  }
}
