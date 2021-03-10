import { Response, Request } from 'express';
import 'reflect-metadata';
import express from 'express';
import "express-async-errors";
import createConnection from "./database";
import { router } from "./routes";
import { AppError } from './errors/AppError';


createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NewableFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "Error",
        message: 'Internal server Error ${err.message}',
    })

})



export{app};

// //get => buscar
// //post => salvar
// //put => alterar
// //delete => deletar
// //patch => alteracao especifica

// //http://localhost:3334/users

// app.get("/", (request, response) => {
//     return response.json({message: "hello word "});
// });

// app.post("/", (request, response) => {
//     return response.json({message: "os dados foram salvos com sucesso"});
// });
