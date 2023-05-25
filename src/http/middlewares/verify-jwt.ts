import { FastifyRequest, FastifyReply } from "fastify";

const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (e) {
        reply.status(401).send({ message: 'Unauthorized' });
    }
};

export const verifyJWTMiddleware = {
    verifyJWT,
};
