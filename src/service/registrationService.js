import { userRepository } from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";

export const registrationService = {

    async registerUser(registrationData) {
        try {
            const existingUser = await userRepository.findUserByEmail(registrationData.email);
            if (existingUser) {
                throw new Error("Usuário já cadastrado");
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(registrationData.password, salt);
            const createdUser = await userRepository.createUser(
                registrationData.email,
                passwordHash
            );

            return createdUser;
            
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};