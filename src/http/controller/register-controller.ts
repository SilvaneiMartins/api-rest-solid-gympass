import { z } from "zod";
import { FastifyRequest, FastifyReply } from 'fastify';

import { UserAlreadyExistsError } from "@/use-cases/errors/user-altready-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase();
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
