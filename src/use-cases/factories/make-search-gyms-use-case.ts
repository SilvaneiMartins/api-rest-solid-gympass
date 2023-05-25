import { SearchGymsUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma";

export const makeSearchGymsUseCase = () => {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new SearchGymsUseCase(gymsRepository);
    return useCase;
}
