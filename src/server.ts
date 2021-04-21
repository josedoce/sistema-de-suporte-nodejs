import express, { Request, Response } from 'express';
const app = express();
import './database';
import { routes } from './routes';
/*
    GET = Busca
    POST = Criação
    PUT = Alteração
    DELETE = Deletar
    PATCH = Alterar uma informaçao especifica
*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

app.listen(3333, ()=>console.log('conectado.'));