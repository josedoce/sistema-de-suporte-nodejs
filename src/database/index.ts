import {createConnection} from 'typeorm';

createConnection()
.then(()=>console.log('db is ok'))
.catch(()=>console.log('db is fail'));