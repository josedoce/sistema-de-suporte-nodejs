import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";


class SettingsController{
    async index(req: Request, res: Response){
        const {chat, username} = req.body;
        
        const settings = getCustomRepository(SettingsRepository);

        const save = await settings.makeSave({
            chat,
            username
        });

        return res.json(save);
    }
}

export default new SettingsController();