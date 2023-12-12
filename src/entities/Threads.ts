import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "./User"
import { Like } from "./Like"
import { Reply } from "./Reply"


@Entity({ name: "threads" })
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    content: string

    @Column({ nullable: true })
    image: string

    @ManyToOne(() => User, (user) => user.threads)
    users: User;

    @OneToMany(() => Like, (like) => like.thread)
    @JoinColumn()
    likes: Like[];

    @OneToMany(() => Reply, (reply) => reply.thread)
    replies: Reply[]
}