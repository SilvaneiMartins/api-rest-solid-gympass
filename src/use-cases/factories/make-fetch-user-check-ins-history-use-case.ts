import { PrismaCheckInsRepository } from "@/repositories/prisma";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

export const makeFetchCheckInsHistoryUseCase = () => {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
    return useCase;
}
