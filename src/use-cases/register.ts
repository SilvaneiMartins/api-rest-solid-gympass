import { hash } from "bcryptjs";
import { User } from "@prisma/client";

import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-altready-exists";

interface RegisterProps {
    name: string;
    email: string;
    password: string;
};

interface RegisterUseCaseResponse {
    user: User
};

class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({ name, email, password }: RegisterProps): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        };

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return { user };
    };
};

export {
    RegisterUseCase,
}
