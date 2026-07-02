import { Router } from "express";
import { UserController } from "../controllers/userController";
import { ValidadeUser } from "../middlewares/ValidateUser";

export const routes  = Router() // Cria o objeto das rotas do express(necessario para criar as rotas)
const userController = new UserController() 


// rotas do usuario


routes.get("/users", userController.list.bind(userController))
routes.get("/users/:id", userController.list.bind(userController))
routes.post("/users",ValidadeUser, userController.list.bind(userController))