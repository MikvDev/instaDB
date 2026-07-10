import { Router } from "express";


import userRoutes from "./user.routes"; 
import postRoutes from "./post.router";
import authRoutes from "./login.router";

export const routes = Router();

routes.use("/users", userRoutes);  
routes.use("/posts", postRoutes);  
routes.use("/auth", authRoutes);    

export default routes;