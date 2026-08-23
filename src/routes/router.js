import { cadastro } from "../controller/controllerCadastro.js";
import { login } from "../controller/controllerLogin.js";
 const router = async (fastify) => {
    fastify.post("/", cadastro.cadastroUser)
    fastify.post("/login",login.loginUsuario )
  }
 export default router