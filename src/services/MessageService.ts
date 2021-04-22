import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate{
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessageService{
    private messagesRepository: Repository<Message>;
    constructor(){
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }
    async create({admin_id, text, user_id}:IMessageCreate){
        
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });

        return await this.messagesRepository.save(message);
    }
    async listByUser(user_id: string){
        
        return await this.messagesRepository.find({
            where: {user_id},
            relations: ['user']
        });
    }
}

export {MessageService};