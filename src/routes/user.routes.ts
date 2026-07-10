
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ValidateUser } from "../middlewares/ValidateUser";


export const routes  = Router() // Cria o objeto das rotas do express(necessario para criar as rotas)const userController = new UserController() 
const userController = new UserController() 

routes.get("/users", userController.list.bind(userController))
routes.get("/users/:id", userController.getById.bind(userController))
routes.post("/users",ValidateUser, userController.create.bind(userController))
routes.put("/users/:id", userController.update.bind(userController))
routes.delete("/users/:id", userController.Delete.bind(userController))//4