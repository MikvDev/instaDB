import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { ManyToOne } from "typeorm"
import { User } from "./User"
@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'varchar',  length: 100, nullable: false})
    tittle: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}