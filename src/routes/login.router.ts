import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
const authController = new AuthController()
export const routes  = Router() // Cria o objeto das rotas do express(necessario para criar as rotas)

routes.post("/login", authController.login.bind(authController))

export default routes   