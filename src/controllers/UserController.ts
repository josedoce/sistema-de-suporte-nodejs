import {Response, Request} from 'express';
import {UserService} from '../services/UserService';

class UserController{
    async index(req: Request, res: Response): Promise<Response>{
        const {email} = req.body;

        const userService = new UserService();
        
        const save = await userService.create({email});
        return res.status(200).json(save);
        
    }
}

export default new UserController();