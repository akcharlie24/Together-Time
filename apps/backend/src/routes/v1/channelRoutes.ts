import { createChannel, getChannels } from "@/controller/channelController";
import { authMiddleware } from "@/middleware/middleware";
import { Router } from "express";

const channelRoutes = Router();

channelRoutes.use(authMiddleware);

channelRoutes.post("/", createChannel);
channelRoutes.get("/:slug", getChannels);

export default channelRoutes as Router;
