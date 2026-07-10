
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ValidateUser } from "../middlewares/ValidateUser";


export const routes  = Router() // Cria o objeto das rotas do express(necessario para criar as rotas)const userController = new UserController() 
const userController = new UserController() 

routes.get("/", userController.list.bind(userController))
routes.get("/:id", userController.getById.bind(userController))
routes.post("/",ValidateUser, userController.create.bind(userController))
routes.put("/:id", userController.update.bind(userController))
routes.delete("/:id", userController.Delete.bind(userController))//4

export default routes