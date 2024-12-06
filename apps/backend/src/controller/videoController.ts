import { Request, Response } from "express";

export async function uploadVideo(req: Request, res: Response) {
  try {
  } catch (e: any) {
    res.status(400).json({ message: "Validation errors", error: e.message });
    return;
  }
}
