import { Router } from "express";
import authRoutes from "./authRoutes";
import channelRoutes from "./channelRoutes";
import videoRoutes from "./videoRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/channels", channelRoutes);
routes.use("/videos", videoRoutes);

export default routes as Router;
