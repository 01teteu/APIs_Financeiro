import { userRepository } from "../repositories/userRepositories.js"
import { passwordResetRepository } from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "node:crypto";
import dotenv from "dotenv"
dotenv.config()
export const authService = {
    async authenticateUser(credentials) {
        try {
            const user = await userRepository.findUserByEmail(credentials.email)
            if (!user) {
                throw new Error("senha ou email inválido")
            }
            const isPasswordValid = await bcrypt.compare(credentials.password, user.senha)
            if (!isPasswordValid) {
                throw new Error("Senha ou email inválido")
            }
            const accessTokenPayload = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRECT, { expiresIn: "1h" })
            return accessToken
        }
        catch (err) {
            console.error(err)
            throw err
        }
    },
    async createPasswordResetCode(passwordResetRequest) {
        try {
            const user = await userRepository.findUserByEmail(passwordResetRequest.email)
            if (!user) {
                throw new Error("Usuario inválido")
            }
            const passwordResetCode = crypto.randomInt(100000, 1000000)// Token gerado 
            const expiresAt = new Date()
            expiresAt.setMinutes(expiresAt.getMinutes() + 5) //Limite de 5 mhn
            const salthash = await bcrypt.genSalt(10)
            const hashCode = await bcrypt.hash(passwordResetCode, salthash)

             await passwordResetRepository.createPasswordResetCode(hashCode, expiresAt, usre.id)
            return passwordResetCode

        }
        catch (err) {
            console.error(err.message)
            throw err
        }
    },
    async exchangePasswordResetCodeForToken(passwordResetData) {
        try {
            const passwordResetCodeRecord = await passwordResetRepository.findPasswordResetCode(passwordResetData.token)
            if (!passwordResetCodeRecord) {
                throw new Error("Token inválido")
            }
            const now = new Date()
            if (now > passwordResetCodeRecord.tempo_expiracao) {
                throw new Error("Token expirou")
            }
            if (passwordResetCodeRecord.usado) {
                throw new Error("Token já usado")
            }
            const passwordResetTokenPayload = {
                tokenUsuario: passwordResetCodeRecord.usuario_id,
                validar: "nova_senha"
            }
            if (passwordResetTokenPayload.validar !== "nova_senha"){
                throw  new Error ("Token inválido")
            }
            const passwordResetToken = jwt.sign(passwordResetTokenPayload, process.env.JWT_SECRECT, { expiresIn: "10 minute" }) // JWT temporario
            await passwordResetRepository.markPasswordResetCodeAsUsed(passwordResetData.token)
            return passwordResetToken
        }
        catch (err) {
            console.error(err.message)
            throw err
        }
    },
    async resetUserPassword(passwordResetData, userId) {
        try {
            const userPromise = passwordResetRepository.findUserById(userId)
            if (!userPromise.id) {
                throw new Error("Usuario inválido")
            }
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(passwordResetData.password, salt)
             await passwordResetRepository.updateUserPassword(passwordHash, userPromise.id)
            return {
                mensagem : "Senha atualizada com sucesso."
            }
        }
        catch (err) {
            console.error(err.message)
            throw err
        }
    },
    async serviceReflashToken (email){
        try{
         const findUserByEmail = await userRepository.findUserByEmail(email)
         if (!findUserByEmail){
            throw new ("Token reenviado")
         }
        const passwordResetCode = crypto.randomInt(100000, 1000000)// Token gerado 
        const expiresAt = new Date()
        expiresAt.setMinutes(expiresAt.getMinutes() + 5)
        const salt = bcrypt.genSalt(10)
        const tokenhahs = bcrypt.hash(passwordResetCode, salt)
        await passwordResetRepository.updateTokenUser(tokenhahs, expiresAt)
        return {
            mensagem: "Token renviado", 
            Token: passwordResetCode
        }
        }
        catch(err){
            console.log(err.message)
            throw err
        }
    }
}
