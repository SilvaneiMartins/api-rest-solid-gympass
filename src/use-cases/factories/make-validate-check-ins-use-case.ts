import { ValidateCheckInUserCase } from "../validate-check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma";

export const makeValidateCheckInUseCase = () => {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new ValidateCheckInUserCase(checkInsRepository);
    return useCase;
}
