import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const autch = {
    jwt(request, reply, next) {
        try {
            const headertoken = request.headers.authorization
            if (!headertoken) {
                throw new Error("Token inválido")
            }
            const splitToken = headertoken.split(' ')
            if (splitToken.length !== 2) {
                throw new Error("Token com o formato inválido")
            }
            const valueToken = splitToken[1]
            const processJwt = jwt.verify(valueToken, process.env.JWT_SECRECT)
            const usuarioId = processJwt.id
            request.usuarioId = usuarioId
            next()
        }
        catch (err) {
            return reply.status(401).send({
                mensagem: "Token inválido ou expirado"
            })
        }
    }
} 