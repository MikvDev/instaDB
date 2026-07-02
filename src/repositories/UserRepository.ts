import { DataSource } from "typeorm";
import { User } from "../models/User";
import { relative } from "node:path";
import { AppDataSource } from "../config/data-source";

const repo = AppDataSource.getRepository(User); 

export const UserRepository = {
    async findAll() {
        return repo.find({relations: ['posts']})
    },
    async findById(id: number){
        return repo.findOne({where: {id}, relations:['posts']})
    },

    async create(data: {name: string, email: string, password :string}){
        const user = repo.create(data)
        return repo.save(user)
    },
}