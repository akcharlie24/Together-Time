import { comparePass, hashPass } from "@/helper/hashing";
import prisma from "@repo/db";
import { SignUpSchema, SignInSchema } from "@repo/types";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Payload extends JwtPayload {
  userId: string;
}

export async function signUpUser(req: Request, res: Response): Promise<void> {
  try {
    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0]?.message);
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { username: parsedData.data.username },
          { email: parsedData.data.email },
        ],
      },
    });

    if (userExists) {
      res.status(409).json({ message: "Username or email alerady exists" });
      return;
    }

    const hashedPassword = await hashPass(parsedData.data.password);

    const newUser = await prisma.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        email: parsedData.data.email,
      },
    });

    if (!newUser) {
      throw new Error("Error Creating User, please try again");
    }

    res.status(201).json({
      message: "User successfully registered",
      userId: newUser.id,
    });
  } catch (e: any) {
    res.status(400).json({ message: "Validation errors", error: e.message });
    return;
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  try {
    const parsedData = SignInSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0]?.message);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!user) {
      res.status(403).json({ message: "User doesnt exist" });
      return;
    }

    const passwordMatch = await comparePass(
      parsedData.data.password,
      user.password,
    );

    if (!passwordMatch) {
      res.status(403).json({ message: "Invalid Password" });
      return;
    }

    const payload: Payload = {
      userId: user.id,
    };

    const authToken: string = jwt.sign(payload, JWT_SECRET);

    res.cookie("Authentication", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Successfully Logged In",
      access_token: authToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e: any) {
    res
      .status(400)
      .json({ message: "Bad Request, Invalid Credentials", error: e.message });
  }
}
