import express, { Request, Response } from 'express';
const app = express();

/*
    GET = Busca
    POST = Criação
    PUT = Alteração
    DELETE = Deletar
    PATCH = Alterar uma informaçao especifica
*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req:Request, res: Response)=>{
    res.json({nome: 'joseildo'});
});

app.post('/', (req: Request, res: Response)=>{
    res.json({
        message: 'Usuario salvo com sucesso.',
        ...req.body
    });
});

app.listen(3333, ()=>console.log('conectado.'));