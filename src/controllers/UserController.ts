import { AppError } from './../errors/AppError';
import {Request, Response} from "express";
import { getCustomRepository, getRepository } from "typeorm";
//import { User } from "../models/User";
import { UsersRepository } from "../repositories/UserRepository";
import * as yup from 'yup'

class UserController {
    async create(request: Request, response: Response) {
        const {name, email} = request.body;

         const schema = yup.object().shape({
             name: yup.string().required("Nome é obrigatorio"),
             email: yup.string().email().required("E-mail incorreto")

         })
try {
    await schema.validate(request.body, {abortEarly: false});
} catch(err){
    throw new AppError(err)
}
       // const body = request.body;
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            throw new AppError("User already exists")
            
        }

        const user = usersRepository.create({
            name, email,
        });

        await usersRepository.save(user);
        
        return response.status(201).json(user);
    }
}
export { UserController };