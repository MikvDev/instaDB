
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { AppDataSource } from './config/data-source'
import { error } from 'node:console'

const app = express()

const PORT =  process.env.PORT // porta do servidor 
AppDataSource.initialize().then(() => {
    console.log("Banco conectado!")
    app.listen(PORT, () => {console.log("Servidor rodando!")})  
}).catch((error) => console.log("Erro ao conectar com o banco:" + error))