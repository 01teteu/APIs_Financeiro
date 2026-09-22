import pool from "../config/database.js";
export const userRepository = {
    async findUserByEmail(email) {
        try {
            const userResult = await pool.query(
                `SELECT id, email, role, senha
                 FROM usuarios
                 WHERE email = $1`,
                [email]
            );

            return userResult.rows[0];

        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    async createUser(email, passwordHash) {
        try {
            const userResult = await pool.query(
                `INSERT INTO usuarios (email, senha)
                 VALUES ($1, $2)
                 RETURNING id, email, role`,
                [email, passwordHash]
            );

            return userResult.rows[0];

        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};
export const passwordResetRepository = {
    async createPasswordResetCode(passwordResetCode,expiresAt, userId){
        try {
            const passwordResetCodeResult = await pool.query(
            `INSERT INTO mudar_senha (usuario_id, codigo, tempo_expiracao)
            VALUES ($1, $2, $3)
            RETURNING id, codigo, tempo_expiracao`,
             [userId, passwordResetCode, expiresAt]
        )
        return passwordResetCodeResult.rows[0]
        }
        catch(err){
            console.error(err.message)
            throw err
        }
    },
    async findPasswordResetCode (passwordResetCode){
        try {
            const passwordResetCodeResult = await pool.query(
                ` SELECT codigo, tempo_expiracao, usado
                    FROM mudar_senha
                    WHERE codigo = $1`,
                    [passwordResetCode]
            )
            return passwordResetCodeResult.rows[0]
        }
        catch (err){
            console.error(err.mesage)
            throw err
        }
    },
   async markPasswordResetCodeAsUsed(passwordResetCode) {
    try {
        const passwordResetCodeResult = await pool.query(
            `UPDATE mudar_senha
             SET usado = true
             WHERE codigo = $1
             RETURNING id, usuario_id, codigo, usado`,
            [passwordResetCode]
        )

        return passwordResetCodeResult.rows[0]

    } catch (err) {
        console.error(err.message)
        throw err
    }
},
    async updateUserPassword (passwordHash, userId){
        try {
            const passwordUpdateQueryPromise = pool.query(
                `UPDATE usuarios
                SET senha = $1
                WHERE id = $2`,
                [passwordHash, userId]
            )
            return passwordUpdateQueryPromise.rows[0]
        }
        catch(err){
            console.error(err.message)
            throw err
        }
    },
    async findUserById(userId){
        try {
            const userQueryPromise = pool.query (
                `SELECT id, email, role, senha
                FROM usuarios
                WHERE id = $1
                RETURNING id, email, role, senha`,
                [userId]
            )
            return userQueryPromise.rows[0]
        }
        catch(err){
            console.error(err.message)
            throw err
        }
    },
    async updateTokenUser(token, timeToken){
        const queryUpdateToken = await pool.query(
            `UPDATE codigo, tempo_expiracao
            SET codigo = $1,
            SET tempo_expiracao = $2`,
            [token, timeToken]
        )
    }
}
