import { usuario } from "../repositories/repositoriesUsuario.js"
import { pesquisaToken } from "../repositories/repositoriesUsuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "node:crypto";
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
            if (!compare) {
                throw new Error("Senha ou email inválido")
            }
            const jwtUsuario = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            const token = jwt.sign(jwtUsuario, process.env.JWT_SECRECT, { expiresIn: "1h" })
            return token
        }
        catch (err) {
            console.error(err)
            throw err
        }
    },
    async recuperarSenhaToken(data) {
        try{
        const user = await usuario.buscaUsuario(data.email)
        if (!user) {
            throw new Error("Usuario inválido")
        }
        const token = crypto.randomInt(100000, 1000000)// Token gerado 
        const temp = new Date()
        temp.setMinutes(temp.getMinutes() + 5) //Limite de 5 min
        const usuarioToken = await pesquisaToken.criarToken(token, temp, user.id)
        return usuarioToken

        } 
            catch(err){
                console.error(err.message)
                throw err
            }
    },
        async validarToken (data) {
            try {
                const tokenUsuario = await pesquisaToken.buscarToken(data.token)
                if (!tokenUsuario){
                    throw new Error("Token inválido")
                }
                const horaAtual = new Date()
                if (horaAtual > tokenUsuario.tempo_expiracao){
                    throw new Error("Token expirou")
                }
                if (tokenUsuario.usado){
                    throw new Error("Token já usado")
                }
                const jwtTokenUsuario = {
                    tokenUsuario: tokenUsuario.usuario_id,
                    validar: "nova_senha"
                }
                const jwtassinado = jwt.sign(jwtTokenUsuario, process.env.JWT_SECRECT, {expiresIn: "10 minute"})
                await pesquisaToken.editarUsoToken(data.token)
                return jwtassinado
            }
                catch(err){
                    console.error(err.message)
                    throw err
                }
        }
}
  