// import { Router } from "express";
// import { UserController } from "../controllers/UserController";
// import { ValidateUser } from "../middlewares/ValidateUser";

// import { PostController } from "../controllers/PostController";
// import { AuthController } from "../controllers/AuthController";

// export const routes  = Router() // Cria o objeto das rotas do express(necessario para criar as rotas)
// const userController = new UserController() 
// const postController = new PostController()
// const authController = new AuthController()

// // rotas do usuario
// routes.get("/users", userController.list.bind(userController))
// routes.get("/users/:id", userController.getById.bind(userController))
// routes.post("/users",ValidateUser, userController.create.bind(userController))
// routes.put("/users/:id", userController.update.bind(userController))
// routes.delete("/users/:id", userController.Delete.bind(userController))//4

// // Rotas de post
// routes.post("/posts", postController.create.bind(postController))
// routes.get("/posts", postController.findAll.bind(postController))
// routes.get("/posts/:id", postController.findOne.bind(postController))
// routes.put("/posts/:id", postController.update.bind(postController))
// routes.delete("/posts/:id", postController.delete.bind(postController))

// routes.post("/login", authController.login.bind(authController))
