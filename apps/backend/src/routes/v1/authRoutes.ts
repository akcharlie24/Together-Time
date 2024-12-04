import { loginUser, signUpUser } from "@/controller/authController";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup", signUpUser);
authRoutes.post("/login", loginUser);

export default authRoutes as Router;
