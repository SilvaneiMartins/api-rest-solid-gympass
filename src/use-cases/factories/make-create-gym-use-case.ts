import { CreateGymUseCase } from "../create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma";

export const makeCreateGymUseCase = () => {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CreateGymUseCase(gymsRepository);
    return useCase;
}
