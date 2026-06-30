// 2 modelos

import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { } from 'typeorm'

import { Post } from "./Post"
// Precisamos sinalizar ao typeORM que esta classe sera mapeada e uyma tabela 
// Para fazer isso usamos um decorator:
@Entity('users')
export class User {
    @PrimaryGeneratedColumn() // indica que isso é uma primary key com autoincrement
    id: number 
    @Column({length: 150, nullable: false}) // length diz tamanho maximo - nullable diz se pode ser vazio
    name: string
    @Column({length: 100, unique: true, nullable: false})
    email: string
    @Column({select: false , nullable: false})
    password: string
}