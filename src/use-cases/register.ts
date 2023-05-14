import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";

interface RegisterProps {
    name: string;
    email: string;
    password: string;
};

class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password }: RegisterProps) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error('User already exists!');
        };

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        });
    };
};

export {
    RegisterUseCase,
}
