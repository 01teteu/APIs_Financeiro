import pool from "../config/dataBase.js";
export const usuario = {
    async buscaUsuario(email) {
        try {
            const buscar = await pool.query(
                `SELECT id, email, role, senha
                 FROM usuarios
                 WHERE email = $1`,
                [email]
            );

            return buscar.rows[0];

        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    async criarUsuario(email, senha) {
        try {
            const criar = await pool.query(
                `INSERT INTO usuarios (email, senha)
                 VALUES ($1, $2)
                 RETURNING id, email, role`,
                [email, senha]
            );

            return criar.rows[0];

        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};