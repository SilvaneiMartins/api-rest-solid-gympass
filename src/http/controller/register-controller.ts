import { z } from "zod";
import { FastifyRequest, FastifyReply } from 'fastify';

import { RegisterUseCase } from "@/use-cases/register";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-altready-exists";
import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";

const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        const response = await registerUseCase.execute({ name, email, password });
        reply.status(201).send(response);
    } catch (e) {
        if (e instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: e.message });
        }
        throw e;
    }
};

export const registerController = {
    register,
};
