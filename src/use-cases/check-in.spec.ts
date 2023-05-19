import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';

import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';

let usersRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check In User Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(usersRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useFakeTimers();
    });

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should be able to check in twice in the day', async () => {
        vi.setSystemTime(new Date(2023, 4, 18, 8, 0, 0));

        await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
        });

        await expect(() =>
            sut.execute({
                userId: 'any_user_id',
                gymId: 'any_gym_id',
            }),
        ).rejects.toBeInstanceOf(Error);
    });

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 4, 17, 8, 0, 0));

        await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
        });

        vi.setSystemTime(new Date(2023, 4, 18, 8, 0, 0));

        const { checkIn } = await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
        })

        expect(checkIn.id).toEqual(expect.any(String));
    });
});
