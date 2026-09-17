import {z} from "zod"
export const userProfileSchema = z.object({
    nome: z.string().min(2),
    idade: z.number().int().positive(),
    renda: z.number().min(1),
    nívelGasto: z.enum(["baixo", "médio", "alto"], {
    errorMap: () => ({ message: "O nível deve ser baixo, médio ou alto" }),
  }),
});
