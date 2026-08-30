
import { cadastro } from "../controller/controllerCadastro.js";
import { login } from "../controller/controllerLogin.js";
 const router = async (fastify) => {
    fastify.post("/", {
      config: {
        rateLimit: {
          max: 15,
          timeWindow: "10 minute"
        }
      }
    }, cadastro.cadastroUser)
    fastify.post("/login", {
      config: {
          rateLimit: {
              max: 10,
              timeWindow: "10 minute"
          }
      }
    }, login.loginUsuario)
    fastify.post("/envioemail", {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "20 minute"
        }
      }
    }, login.recuperarSenha)
    fastify.post ("/enviocodigo", {
      config: {
        rateLimit: {
            max: 10,
            timeWindow: "20 minute"
        }
      }
    }, login.validarToken)
  }
 export default router