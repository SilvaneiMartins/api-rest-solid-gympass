import { AuthenticateUseCase } from "../authenticate";
import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";

export const makeAuthenticateUseCase = () => {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);
    return authenticateUseCase;
}
