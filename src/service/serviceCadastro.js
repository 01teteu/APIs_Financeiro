import { usuario } from "../repositories/repositoriesUsuario.js";
import bcrypt from "bcrypt";

export const serviceCadastro = {

    async cadastro(data) {
        try {
            const buscaUsuario = await usuario.buscaUsuario(data.email);
            if (buscaUsuario) {
                throw new Error("Usuário já cadastrado");
            }
            const salts = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salts);
            const novoUsuario = await usuario.criarUsuario(
                data.email,
                hash
            );

            return novoUsuario;
            
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};