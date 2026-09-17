import { loginSchema, passwordResetRequestSchema, passwordResetCodeSchema } from "../schema/authSchemas.js";
import { passwordResetSchema } from "../schema/registrationSchemas.js";
import { authService } from "../service/authService.js";

export const authController = {
    async login(request, reply) {
        try {
            const validationResult = loginSchema.safeParse(request.body)
            if (!validationResult.success) {
                return reply.status(400).send({
                    mensagem: validationResult.error.flatten().fieldErrors
                })
            }
            const accessToken = await authService.authenticateUser(validationResult.data)
            return reply.status(200).send({
                menssagem: "Usuario logado com sucesso",
                token: accessToken
            })
        }
        catch (err) {
            return reply.send({
                mensagem: err.message
            })
        }
    },
    async requestPasswordReset(request, reply) {
        try {
            const validationResult = passwordResetRequestSchema.safeParse(request.body)
            if (!validationResult.success) {
                return reply.status(400).send({
                    mensagem: validationResult.error.flatten().fieldErrors
                })
            }
            const createdPasswordResetCode = await authService.createPasswordResetCode(validationResult.data)
            return reply.status(200).send({
                mensagem: createdPasswordResetCode
            })
        }
        catch (err) {
            return reply.send({
                mensagem: err.message
            })
        }
    },
    async validatePasswordResetCode(request, reply) {
        try {
            const validationResult = passwordResetCodeSchema.safeParse(request.body)
            if (!validationResult.success) {
                return reply.status(400).send({
                    mensagem: validationResult.error.flatten().fieldErrors
                })
            }
            const passwordResetToken = await authService.exchangePasswordResetCodeForToken(validationResult.data)
            return reply.status(200).send({
                mensagem: passwordResetToken
            })
        }
        catch (err) {
            return reply.send({
                mensagem: err.message
            })
        }
    },
    async resetPassword(request, reply) {
        try {
            const validationResult = passwordResetSchema.safeParse(request.body)
            const userId = request.user.usuarioId
            if (!validationResult.success) {
                return reply.status(400).send({
                    mensagem: validationResult.error.flatten().fieldErrors
                })
            }
            const passwordResetPromise = authService.resetUserPassword(validationResult.data, userId)
            return reply.status(200).send({
                mensagem: passwordResetPromise
            })
        }
        catch (err) {
            return reply.send({
                mensagem: err.message
            })
        }
    }
} 