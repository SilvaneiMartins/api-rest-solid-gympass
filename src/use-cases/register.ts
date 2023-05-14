import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

interface RegisterProps {
    name: string;
    email: string;
    password: string;
};

const registerUseCase = async ({ name, email, password }: RegisterProps) => {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if (userWithSameEmail) {
        throw new Error('User already exists!');
    };

    const prismaUsersRepository = new PrismaUsersRepository();

    await prismaUsersRepository.create({
        name,
        email,
        password_hash,
    });
};

export {
    registerUseCase,
};
