import { FastifyInstance } from "fastify";

import {
    profileController,
    registerController,
    authenticateController,
} from "@/http/controller";

export const appRoutes = async (app: FastifyInstance) => {
    /** Não precisa de autenticação */
    app.post('/users/register', registerController.register);
    app.post('/sessions', authenticateController.authenticate);

    /** Só quando estiver autenticado */
    app.get('/profile/me', profileController.profile);
};
