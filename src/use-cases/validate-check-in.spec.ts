import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';

import { ValidateCheckInUserCase } from './validate-check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';
import { ResourceNotFoundError } from './errors/resource-not-found-exists';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUserCase;

describe('Validate Check In User Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUserCase(checkInsRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useFakeTimers();
    });

    it('should be able to validated the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01',
        });

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        });

        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
    });

    it('should not be able to validated an inexistent check-in', async () => {
        await expect(
            sut.execute({
                checkInId: 'inexistent-check-in-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to validated a check-in after 20 minutos of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

        const createdCheckIn = await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01',
        });

        const twentyOneMinutesInMy = 1000 * 60 * 21;
        vi.advanceTimersByTime(twentyOneMinutesInMy);

        await expect(() =>
            sut.execute({
                checkInId: createdCheckIn.id,
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
