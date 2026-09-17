import { userProfileSchema } from "../schema/userProfileSchema.js"
export const userProfileController ={
    async validateUserProfile(request, reply){
       try {
         const validationResult = userProfileSchema.safeParse(request.body)
        if(!validationResult.success){
            return reply.status(400).send({
                mensagem: validationResult.error.flatten().fieldErrors
            })
        }
        // Passar os dados do zod para o servicesperguntas adicionais 
    }
     catch(err){

     }  
}
}