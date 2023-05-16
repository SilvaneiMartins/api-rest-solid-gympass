import { RegisterUseCase } from "../register";
import { PrismaUsersRepository } from "@/repositories/prisma/PrismaUsersRepository";

export const makeRegisterUseCase = () => {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    return registerUseCase;
}
