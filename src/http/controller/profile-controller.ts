import { FastifyRequest, FastifyReply } from 'fastify';

const profile = async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify();

    return reply.status(200).send({ message: "Perfil de Usuário!"});
};

export const profileController = {
    profile,
};
