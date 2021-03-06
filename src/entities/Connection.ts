import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity('connections')
class Connection{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    admin_id: string;

    @JoinColumn({name: 'user_id'})
    @ManyToOne(()=>User)
    user: User;

    @Column()
    user_id: string;

    @Column()
    socket_id: string;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export {Connection};