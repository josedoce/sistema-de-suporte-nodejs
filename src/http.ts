import express, { Request, Response } from 'express';
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import { routes } from './routes';
import path from 'path';
import './database';

const app = express();

app.use(express.static(path.join(__dirname, '..','public')));
app.set('views',path.join(__dirname, '..','public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.get('/pages/client',(req, res)=>{
    return res.render('html/client.html')
});

const http = createServer(app); //Criando protocolo http
const io = new Server(http); //Criando protocolo ws/websocket

//capitura do usuario que se conectou pela primeira ve
io.on('connection',(socket: Socket)=>{
    console.log(socket.id + " se conectou.");    
})



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

export {http, io};