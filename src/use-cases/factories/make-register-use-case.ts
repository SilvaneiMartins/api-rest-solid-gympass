import { RegisterUseCase } from "../register";
import { PrismaUsersRepository } from "@/repositories/prisma";

export const makeRegisterUseCase = () => {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    return registerUseCase;
}
