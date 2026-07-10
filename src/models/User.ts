// 2 modelos

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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
    @Column({  nullable: false})
    password: string

    // indeica que um usuario pode ter mais de um post 
    @OneToMany(() => Post, post => post.user)
    posts: Post[] 
}