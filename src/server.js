import fastify from "fastify";
import dotenv from "dotenv";
import router from "./routes/router.js";
import fastifyRateLimit from "@fastify/rate-limit"
dotenv.config();
const server = fastify();
server.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "10 minute"
})
const port = process.env.PORT;
server.register(router, {
    prefix: "/finance"
});
try {
    server.listen({ port }, () => {
        console.log("Servidor rodando");
    });
} catch (err) {
    console.error(err);
    process.exit(1);
}