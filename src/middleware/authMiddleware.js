import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const authMiddleware = {
    verifyJwt(request, reply, next) {
        try {
            const authorizationHeader = request.headers.authorization
            if (!authorizationHeader) {
                throw new Error("Token inválido")
            }
            const authorizationParts = authorizationHeader.split(' ')
            if (authorizationParts.length !== 2) {
                throw new Error("Token com o formato inválido")
            }
            const jwtToken = authorizationParts[1]
            const verifiedPayload = jwt.verify(jwtToken, process.env.JWT_SECRECT)
            const userId = verifiedPayload.id
            request.usuarioId = userId
            next()
        }
        catch (err) {
            return reply.status(401).send({
                mensagem: "Token inválido ou expirado"
            })
        }
    }
} 