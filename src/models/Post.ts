import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'varchar',  length: 100, nullable: false})
    tittle: string


}