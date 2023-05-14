import { FastifyInstance } from "fastify";

import { registerController } from "@/http/controller";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/users/register', registerController.register);
};
