import { Socket } from 'socket.io';
import {io} from '../http';
import {ConnectionsService} from '../services/ConnectionsService';
import { MessageService } from '../services/MessageService';
import {UserService} from '../services/UserService';

interface IParams{
    text: string;
    email: string;
}

io.on('connect',(socket:Socket)=>{//on é um evento
    
    const connectionsService = new ConnectionsService();
    const usersService = new UserService();
    const messagesService = new MessageService();
    //socket = o usuario atual conectado.
    socket.on("client_first_access", async (params)=>{ //será emitivo em direção a esta funçao
        const socket_id = socket.id;
        const {text, email} = params as IParams;
        let user_id = null;

        const userExists = await usersService.findByEmail(email);
        if(!userExists){
            //se usuario não existir, crie.
            const user = await usersService.create({email});

            await connectionsService.create({
                socket_id,
                user_id: user.id
            });
            user_id = user.id;
        }else{
            user_id = userExists.id;
            //senão use os dados do existente.
            const connection = await connectionsService.findByUserId(userExists.id);
            
            if(!connection){
                //se não existir conexão
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                });
            }else{
                //se existir, sobrescreva o socket_id
                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }
            
            
        }
        await messagesService.create({
            text,
            user_id
        });
        const allMessages = await messagesService.listByUser(user_id);
        //aqui emitirei para o fronteds todas as messagens
        socket.emit('client_list_all_messages',allMessages);

        const allUsers = await connectionsService.findAllWithoutAdmin();
        io.emit('admin_list_all_users',allUsers);
    });
    socket.on('client_send_to_admin',async (params)=>{
        const {text, socket_admin_id} = params;
        
        const socket_id = socket.id;

        const {user_id} = await connectionsService.findBySocketId(socket_id);
        
        const message = await messagesService.create({
            text,
            user_id
        });
        
        //enviando estes dados do cliente para o adm
        io.to(socket_admin_id).emit('admin_receive_message',{
            message,
            socket_id
        });
    })
});