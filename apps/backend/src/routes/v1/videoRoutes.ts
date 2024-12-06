import { uploadVideo } from "@/controller/videoController";
import { Router } from "express";

const videoRoutes = Router();

videoRoutes.post("/upload", uploadVideo);

export default videoRoutes as Router;
