import {Router} from 'express';
import MessagesController from './controllers/MessagesController';
import SettingsController from './controllers/SettingsController';
import UserController from './controllers/UserController';
const routes = Router();

routes.post('/settings', SettingsController.index)
routes.post('/users', UserController.index)
routes.post('/messages', MessagesController.index)
routes.get('/messages/:id', MessagesController.showByUser)

export {routes};