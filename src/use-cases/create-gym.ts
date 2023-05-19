import { Gym } from "@prisma/client";

import { GymsRepository } from "@/repositories/gyms-repository";

interface RegisteCreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
};

interface CreateGymUseCaseResponse {
    gym: Gym;
};

class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude,
    }: RegisteCreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
        });

        return { gym };
    };
};

export {
    CreateGymUseCase,
}
