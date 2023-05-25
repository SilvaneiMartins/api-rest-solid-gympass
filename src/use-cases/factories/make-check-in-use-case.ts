import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRepository, PrismaGymsRepository } from "@/repositories/prisma";

export const makeCheckInUseCase = () => {
    const gymsRepository = new PrismaGymsRepository();
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);
    return useCase;
}
