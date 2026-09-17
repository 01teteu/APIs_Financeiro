import {number, string, z} from "zod"
    export const loginSchema = z.object({
        email: z.email(),
        password: z.string()
    })
    export const passwordResetRequestSchema = z.object({
        email: z.email()
    })
    export const passwordResetCodeSchema =  z.object({
        token: number().min(6)
    })