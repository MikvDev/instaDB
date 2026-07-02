import { NextFunction, Request, Response } from "express";

// esse middleware vai formatar cada resposta de erro.  Ao inves de cada controller ter que pegar um erro e formatar a mensagem bonitinh, ele faz  isso para todo mundo, tipo aquele amigo que faz todo o trabalho enquanto tu ficou no celular pq vc sabia que ele ia fazer pra ti mesmo
export function ErrorHandler(error: any, req: Request, res: Response, next: NextFunction){
    console.error("Erro capturado pelo errorHandler: ", error)
    // Esse tal de 'er_dup_entry' é especifico do MYSQL: ele acontece quando a gente tenta salvar algio que já existe e tem UNIQUE(exemplo: Criar um usuario com um email que já existe)
    if(error.code == 'ER_DUP_ENTRY'){
        // status 409 é para entrada duplicada
        return res.status(409).json({
            message: "Registro duplicado(emaiç já existe)"
        })
    }
    // Se for qualquer outro erro que a gente nçao previu!
    return res.status(500).json({
        message: "Erro interno do servidor!"
    })

    
}