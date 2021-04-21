import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting>{
    async makeSave(data: object):Promise<Setting>{
        const settings = this.create(data)
        return await this.save(settings);   
    }
}

interface SettingsRepositoryInterface extends SettingsRepository{}
export { SettingsRepository, SettingsRepositoryInterface };