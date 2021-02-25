import 'reflect-metadata'
import express from 'express';
import "./database";
import { router } from "./routes";
const app = express();

app.use(express.json());
app.use(router);

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

app.listen(3334, () => console.log("Server is running!"));



