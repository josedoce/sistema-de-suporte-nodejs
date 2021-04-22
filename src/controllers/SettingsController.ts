import { Request, Response } from "express";
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
}

export default new SettingsController();