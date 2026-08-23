import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

export default pool;