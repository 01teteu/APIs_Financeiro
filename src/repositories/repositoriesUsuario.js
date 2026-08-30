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
export const pesquisaToken = {
    async criarToken(token,temp, userid){
        try {
            const busca = await pool.query(
            `INSERT INTO mudar_senha (usuario_id, codigo, tempo_expiracao)
            VALUES ($1, $2, $3)
            RETURNING id, codigo, tempo_expiracao`,
             [userid, token, temp]
        )
        return busca.rows[0]
        }
        catch(err){
            console.error(err.message)
            throw err
        }
    },
    async buscarToken (token){
        try {
            const busca = await pool.query(
                ` SELECT codigo, tempo_expiracao, usado
                    FROM mudar_senha
                    WHERE codigo = $1`,
                    [token]
            )
            return busca.rows[0]
        }
        catch (err){
            console.error(err.mesage)
            throw err
        }
    },
   async editarUsoToken(token) {
    try {
        const editar = await pool.query(
            `UPDATE mudar_senha
             SET usado = true
             WHERE codigo = $1
             RETURNING id, usuario_id, codigo, usado`,
            [token]
        )

        return editar.rows[0]

    } catch (err) {
        console.error(err.message)
        throw err
    }
}
        
}
