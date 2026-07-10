import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
export function authMiddleware(req: Request, res: Response, next: NextFunction){
    // No objeto da rquisição, ele vai até os headers e verifica se tem algo dentro de authorization, se tiver, armazena aqui dentro, ou se não tiver, é nulo.    
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(401).json({
            message: "Token não encontrado! Token não fornecido!"
        })
    }

    
    // Se tiver o token precisamos extrair ele
    // O split pega uma string e divide ela pelo caracte4r que colocamos nos parenteses
    // POr exemplo, se eu colocar uma string com um espaço no meio (" " ) ele divide a string original sempre que achar um espaço
    // então, se eu tenho uma string assim: "Bearer TOKEN"

    // Se pegarmos o indice 1 desse array, achamos o token
    const token = authorization.split(" ")[1] // pega a parte do token
    const bearer = authorization.split(" ")[0] // pega a parte do bearer
    if(bearer !== "Bearer"){
        return res.status(401).json({
            message: "Token mal formatado!"
        })
    
    }    
    const decoded = verifyToken(token)
    if(!decoded){
        return res.status(401).json({
            message: "Token inválido!"
        })
    }
    // A rquisição ainda não tem um user dentro dela 
    // Request não tem o atributo user
    // Eu estou tentando criar ele para armazenar as informaçõs de um usuario dentro da requisição
    // Mas o type não deixa
    // Para burlar isso, transformamos temporariamente em req em tipo 'any', que aceita qualquer coisa
    (req as any).user = decoded
    next()
    
    
}