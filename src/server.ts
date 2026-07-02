
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { AppDataSource } from './config/data-source'
import { error } from 'node:console'
import { routes } from './routes'
import { ErrorHandler } from './middlewares/ErrorHandler'

const app = express()
app.use(express.json())
app.use(routes)


// inicialize() é um metodo do typeorm  que abre  que abre a conexão com o banco usando as configurações que escrevemos no data-source. Ele também carrega as entifdades e executa a criação  das tebelas
// then() -> a função dentro dle é execurtada se der certo
// caath() -> Roda se ouver se ouver erro

const PORT =  process.env.PORT // porta do servidor 
AppDataSource.initialize().then(() => {
    console.log("Banco conectado!")
    app.use(ErrorHandler)
    app.listen(PORT, () => {console.log("Servidor rodando!")})  
}).catch((error) => console.log("Erro ao conectar com o banco:" + error))