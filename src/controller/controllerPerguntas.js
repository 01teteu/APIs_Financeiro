import { schemaPerguntas } from "../schema/schemaPergunta.js";

export const perguntasUsuario ={
    async perguntas(request, reply){
        const results = schemaPerguntas.safeParse(request.body)
        if(!results.success){
            return reply.status(400).send({
                mensagem: results.error.flatten().fieldErrors
            })
            
        }
    }
}