import { FastifyInstance } from "fastify";

import {
    registerController,
    authenticateController,
} from "@/http/controller";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/users/register', registerController.register);

    app.post('/sessions', authenticateController.authenticate);
};
