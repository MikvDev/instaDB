
import { Router } from "express";

import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middlewares/AuthMiddleware";


export const routes  = Router() // Cria o objeto das rotas do express(necessario para criar as rotas)

const postController = new PostController()

routes.get("/myposts", authMiddleware, postController.listMyPosts.bind(postController))

routes.post("/", postController.create.bind(postController))
routes.get("/", postController.findAll.bind(postController))
routes.get("/:id", postController.findOne.bind(postController))
routes.put("/:id", postController.update.bind(postController))
routes.delete("/:id", postController.delete.bind(postController))

export default routes