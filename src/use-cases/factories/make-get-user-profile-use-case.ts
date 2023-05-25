import { GetUserProfileUseCase } from "../get-user-profile";
import { PrismaUsersRepository } from "@/repositories/prisma";

export const makeGetUserProfileUseCase = () => {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new GetUserProfileUseCase(usersRepository);
    return useCase;
}
