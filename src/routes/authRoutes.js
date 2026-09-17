
import { registrationController } from "../controller/registrationController.js";
import { authController } from "../controller/authController.js";
 const registerAuthRoutes = async (fastify) => {
    fastify.post("/", {
      config: {
        rateLimit: {
          max: 15,
          timeWindow: "10 minute"
        }
      }
    }, registrationController.registerUser)
    fastify.post("/login", {
      config: {
          rateLimit: {
              max: 10,
              timeWindow: "10 minute"
          }
      }
    }, authController.login)
    fastify.post("/emailtoken", {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "20 minute"
        }
      }
    }, authController.requestPasswordReset)
    fastify.post ("/token", {
      config: {
        rateLimit: {
            max: 10,
            timeWindow: "20 minute"
        }
      }
    }, authController.validatePasswordResetCode)
    fastify.patch("/novasenha", {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "30 minute"
        }
      }
    }, authController.resetPassword)
  }
 export default registerAuthRoutes