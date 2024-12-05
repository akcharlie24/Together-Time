import { Router } from "express";
import authRoutes from "./authRoutes";
import channelRoutes from "./channelRoutes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/channels", channelRoutes);

export default routes as Router;
