import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetUserProfileUseCase } from '@/use-cases/factories';

const profile = async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify();

    const getUserProfile = makeGetUserProfileUseCase();

    const { user } = await getUserProfile.execute({
        userId: request.user.sub,
    });

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined,
        }
    });
};

export const profileController = {
    profile,
};
