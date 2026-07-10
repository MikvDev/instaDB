
import { Router } from "express";

import { PostController } from "../controllers/PostController";


export const routes  = Router() // Cria o objeto das rotas do express(necessario para criar as rotas)

const postController = new PostController()

routes.post("/posts", postController.create.bind(postController))
routes.get("/posts", postController.findAll.bind(postController))
routes.get("/posts/:id", postController.findOne.bind(postController))
routes.put("/posts/:id", postController.update.bind(postController))
routes.delete("/posts/:id", postController.delete.bind(postController))
