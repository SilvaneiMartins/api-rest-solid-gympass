import { FastifyInstance } from "fastify";

import {
    profileController,
    registerController,
    authenticateController,
} from "@/http/controller";
import { verifyJWTMiddleware } from "../middlewares/verify-jwt";

export const appRoutes = async (app: FastifyInstance) => {
    /** Não precisa de autenticação */
    app.post('/users/register', registerController.register);
    app.post('/sessions', authenticateController.authenticate);

    /** Só quando estiver autenticado */
    app.get('/profile/me', { onRequest: [verifyJWTMiddleware.verifyJWT] }, profileController.profile);
};
