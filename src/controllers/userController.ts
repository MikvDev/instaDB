import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class userController{
    async list(req: Request, res: Response, next: NextFunction){
        try{
            // è papel do controller chamar os metosos que criamos na camada services
            const user = await UserService.listAll()
            return res.json(user)
            // Note que a gente não usou o status aqui. Isso pq, quandi a gente não define status, ele retorna automaticamnete o status 200
        }catch(error){
            //  next(Error) jogo o erro pro errorHandler, que decide o status
            next(error)
        }

    }
    async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number(req.params.id)
            const user = await UserService.GetById(id)
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction ){
        try {
            const {name, email, password} = req.body
            const user = UserService.Create({name, email, password})
            return res.status(201).json(user)
        } catch (error) {
            next(error)
        }

    }
}