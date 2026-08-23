import fastify from "fastify";
import dotenv from "dotenv";
import router from "./routes/router.js";

dotenv.config();

const server = fastify();

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