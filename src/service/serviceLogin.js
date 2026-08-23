import { usuario } from "../repositories/repositoriesUsuario.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const serviceLogin = {
    async login(data) {
        try {
            const user = await usuario.buscaUsuario(data.email)
            if (!user) {
                throw new Error("senha ou email inválido")
            }
            const compare = await bcrypt.compare(data.password, user.senha)
            if(!compare){
                throw new Error("Senha ou email inválido")
            }
            const jwtUsuario = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            const token = jwt.sign(jwtUsuario, process.env.JWT_SECRECT, {expiresIn: "1h"})
            
            return {
                response: "Deu certo",
                token: token
            }
        }
        catch (err) {
            console.error(err)
            throw err
        }
    }
}
