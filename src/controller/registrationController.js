import { registrationService } from "../service/registrationService.js"
import { registrationSchema } from "../schema/registrationSchemas.js";

export const registrationController = {
    async registerUser(request, reply) {
        try {
            const validationResult = registrationSchema.safeParse(request.body)
            if (!validationResult.success) {
                return reply.status(400).send({
                    mensagem: validationResult.error.flatten().fieldErrors
                })
            }
            const createdUser = await registrationService.registerUser(validationResult.data)
            return reply.status(201).send({
                mensagem: "Usuario criando com sucesso."
            })
        }
        catch (err) {
            return reply.send({
                mensagem: err.message
            })
        }
    }
}
