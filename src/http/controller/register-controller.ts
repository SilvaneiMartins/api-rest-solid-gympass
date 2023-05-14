import { z } from "zod";
import { FastifyRequest, FastifyReply } from 'fastify';

import { registerUseCase } from "@/use-cases/register";

const register = async (request: FastifyRequest, reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const response = await registerUseCase({ name, email, password });
        reply.status(201).send(response);
    } catch (e) {
        return reply.status(409).send();
    }
};

export const registerController = {
    register,
};
