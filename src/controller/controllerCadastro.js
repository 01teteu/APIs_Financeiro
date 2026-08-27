import { serviceCadastro } from "../service/serviceCadastro.js"
import { registerSchema } from "../schema/schemaCadastro.js";

export const cadastro = {
    async cadastroUser(request, reply) {
        try {
            const results = registerSchema.safeParse(request.body)
            if (!results.success) {
                return reply.status(400).send({
                    mensagem: results.error.flatten().fieldErrors
                })
            }
            const data = await serviceCadastro.cadastro(results.data)
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