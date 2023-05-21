import dayjs from 'dayjs';
import { CheckIn } from '@prisma/client';

import { CheckInsRepository } from '@/repositories';
import { ResourceNotFoundError } from './errors/resource-not-found-exists';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error';

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

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minute'
        );

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError();
        }

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}
