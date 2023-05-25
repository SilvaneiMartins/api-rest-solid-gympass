import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma";

export const makeGetUserMetricsUseCase = () => {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new GetUserMetricsUseCase(checkInsRepository);
    return useCase;
}
