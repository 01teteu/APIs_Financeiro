import {number, string, z} from "zod"
    export const schemaLogin = z.object({
        email: z.email(),
        password: z.string()
    })
    export const restartSenha = z.object({
        email: z.email()
    })
    export const validarToken =  z.object({
        token: number().min(6)
    })