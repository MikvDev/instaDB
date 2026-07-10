import { NextFunction, Response, Request } from "express";
import { PostService } from "../services/PostService";
import { NotFoundError } from "../services/UserServices";



export class PostController  {

    async findAll(req: Request, res: Response, next: NextFunction){
        try {
            const post = await PostService.listAll()
            res.json(post)
        }catch(error){
         next(error)
        }
        
    }
    async findOne(req: Request, res:Response, next: NextFunction){
        try{
            const id = Number(req.params.id)
            const post = await PostService.getById(id)
            res.json(post)

        }catch(error){
            next(error)

        }
    }
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const {title, userId} = req.body
            const post = await PostService.create({title, userId})
            return res.status(201).json({
                message: "Post criado!"
            })

        }catch(error){
            next(error)

        }

    }
    async update(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number(req.params.id)
            const {title, userId} = req.body

            const post = await PostService.create({title, userId})
            res.status(200).json({
                message: "Post atualizado"
            })
        }catch(error){
            next(error)
        }

    }
    async delete(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number(req.params.id)
            const post = await PostService.delete(id)
            return res.status(200).json({
                message: "Post apagado"
            })
        }catch(error){
            next(error)
        }
    }
    async listMyPosts(req: Request, res: Response, next: NextFunction){
        try{
            const loggedUser = (req as any).user
            const myPosts = await PostService.ListMyPosts(loggedUser.id)
            return  res.status(200).json(myPosts)
        }catch(error){
            next(error)
        }
    
    }
}