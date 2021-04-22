import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

interface IUserCreate{
    email: string;
}

class UserService{
    private userRepository: Repository<User>;
    constructor(){
        this.userRepository = getCustomRepository(UserRepository);
    }
    async create({email}:IUserCreate){
        
        const userAlreadyExists = await this.userRepository.findOne({email});
        
        if(userAlreadyExists){
            return userAlreadyExists;
        }

        const user = this.userRepository.create({email});
        return await this.userRepository.save(user);
    }
}

export {UserService};