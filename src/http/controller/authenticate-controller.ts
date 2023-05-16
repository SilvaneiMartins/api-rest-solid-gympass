import { z } from "zod";
import { FastifyRequest, FastifyReply } from 'fastify';

import { AuthenticateUseCase } from "@/use-cases";
import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-erro";

const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const authenticateUseCase = new AuthenticateUseCase(usersRepository);

        const response = await authenticateUseCase.execute({ email, password });
        reply.status(200).send({ message: "Usuário autenticado", user: response.user });
    } catch (e) {
        if (e instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: e.message });
        }
        throw e;
    }
};

export const authenticateController = {
    authenticate,
};