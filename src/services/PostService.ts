import { ErrorHandler } from "../middlewares/ErrorHandler";
import { PostRepository } from "../repositories/PostRepository"
import { UserRepository } from "../repositories/UserRepository"
export class NotFoundError extends Error {}
export const PostService = {


    async listAll(){
        return PostRepository.findAll(); // Metodo para pegar todos os posts   
    },
    async getById(id: number){
        const post = await PostRepository.findOne(id)
        if(!post) throw new NotFoundError("Post não existe!");
        return post
    },
    async delete(id: number){
        const post = await PostRepository.delete(id)
        if(post.affected === 0){
            throw new NotFoundError("Nenhum post apagado!")
        }
    
    
    },
    async update(id: number, data: { title?: string}){
        const post = await PostRepository.findOne(id);

        if(!post) throw new NotFoundError("Post não encontrado!")
        if(data.title) post.title = data.title;
       
        const updatedPost = await PostRepository.create(post)
        return updatedPost

    },
    async create(data: {title: string, userId: number }){
        const user = await UserRepository.findById(data.userId)
        if(!user) throw new NotFoundError("")
        const post = await PostRepository.create({
            title: data.title,
            user
        })

        return post

    }



}