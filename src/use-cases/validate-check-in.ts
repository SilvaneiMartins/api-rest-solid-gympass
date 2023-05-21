import { CheckIn } from '@prisma/client';

import { CheckInsRepository } from '@/repositories';
import { MaxDistanceError } from './errors/max-distance-error';
import { GymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-exists';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

interface ValidateCheckInUserCaseRequest {
    checkInId: string;
}

interface ValidateCheckInUserCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUserCase {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({
        checkInId,
    }: ValidateCheckInUserCaseRequest): Promise<ValidateCheckInUserCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        };

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}
