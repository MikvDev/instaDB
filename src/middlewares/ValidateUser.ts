import { Request, Response, NextFunction } from "express";
import { json } from "node:stream/consumers";
// Se name, email, password foram preenchioos corretamente
export function ValidadeUser(req: Request, res: Response, next: NextFunction){
    const {name, email, password} = req.body   
    if(!name || !email || !password){
        return res.status(400).json({
            message:"Os campos: (Email - Senha - Nome) não foram preenchidos!"
        })
    }
    if (password.length < 6){
        return res.status(400).json({
            message: "A senha deve ter mais de 6 caracteres!"
        })
    }

    // Se passpu em todas as verificações, então deixamos a requisição seguir adiante e passar pela fronteira com o Brasil com as muambas do paraguai
    next()
}