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
            return reply.status(200).send({
                menssagem: "Usuario logado com sucesso",
                token: data
            })
        }
        catch(err){
            return reply.send({
                mensagem: err.message
            })
        }
    }
 }