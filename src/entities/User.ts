import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Thread } from "./Threads";
import { Like } from "./Like";
import { Reply } from "./Reply";

@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    full_name: string

    @Column()
    email: string

    @Column({select: false})
    password: string

    @Column({nullable: true})
    profile_picture: string

    @Column({nullable:true})
    profile_description: string

    @OneToMany(() => Thread, (thread) => thread.users)
    threads: Thread[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Reply, (replies) => replies.user)
    reply: Reply[];

    @Column({nullable: true})
    bio: string;

    @ManyToMany(() => User, (user) => user.following)
    @JoinTable({
      name: "followers",
      joinColumn: {
        name: "follower_id",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "following_id",
        referencedColumnName: "id",
      },
    })
    followers: User[];

    @ManyToMany(() => User, (user) => user.followers)
    @JoinTable({
      name: "followers",
      joinColumn: {
        name: "following_id",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "follower_id",
        referencedColumnName: "id",
      },
    })
    following: User[];
}
