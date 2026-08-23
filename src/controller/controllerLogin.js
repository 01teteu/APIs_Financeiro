import { schemaLogin } from "../schema/schemaLogin.js";
import { serviceLogin } from "../service/serviceLogin.js";

export const login = {
    async loginUsuario(request, reply){
        try{
            const results = schemaLogin.safeParse(request.body)
            if(!results.success){
                return reply.status(400).send({
                    mensagem: results.error.flatten().fieldErrors
                })
            }
            const data = await serviceLogin.login(results.data)
            return reply.status(200).code({
                menssagem: "Usuario logado com sucesso"
            })
        }
        catch(err){
            return reply.send({
                mensagem: err.message
            })
        }
    }
 }