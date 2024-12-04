import { signInUser, signUpUser } from "@/controller/authController";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup", signUpUser);
authRoutes.post("/signin", signInUser);

export default authRoutes as Router;
