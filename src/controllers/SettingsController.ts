import { Request, response, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController{
    async index(req: Request, res: Response){
        const {chat, username} = req.body;
        
        const settingsService = new SettingsService();
        try {
            const save = await settingsService.create({
                chat,
                username
            });
            
            return res.status(200).json(save);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
        
    }
    async findByUserName(req: Request, res: Response){
        const {username} = req.params;
        const settingsService = new SettingsService();
        const settings = await settingsService.findByUserName(username);
        return res.json(settings);
    }

    async update(req: Request, res: Response){
        const {username} = req.params;
        const {chat} = req.body;
        const settingsService = new SettingsService();
        const settings = await settingsService.update(username, chat);
        return res.json(settings);
    }
}

export default new SettingsController();