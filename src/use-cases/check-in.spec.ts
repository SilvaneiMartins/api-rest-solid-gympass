import { Decimal } from '@prisma/client/runtime';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';

import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository, InMemoryGymsRepository } from '@/repositories/in-memory';

let usersRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In User Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(usersRepository, gymsRepository);

        gymsRepository.items.push({
            id: 'any_gym_id',
            title: 'Academia Sam',
            description: 'Academia Sam',
            phone: '123456789',
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useFakeTimers();
    });

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
            userLatitude: -12.749340341723217,
            userLongitude: -60.15101547869751,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should be able to check in twice in the day', async () => {
        vi.setSystemTime(new Date(2023, 4, 18, 8, 0, 0));

        await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
            userLatitude: -12.749340341723217,
            userLongitude: -60.15101547869751,
        });

        await expect(() =>
            sut.execute({
                userId: 'any_user_id',
                gymId: 'any_gym_id',
                userLatitude: -12.749340341723217,
                userLongitude: -60.15101547869751,
            }),
        ).rejects.toBeInstanceOf(Error);
    });

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 4, 17, 8, 0, 0));

        await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
            userLatitude: -12.749340341723217,
            userLongitude: -60.15101547869751,
        });

        vi.setSystemTime(new Date(2023, 4, 18, 8, 0, 0));

        const { checkIn } = await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
            userLatitude: -12.749340341723217,
            userLongitude: -60.15101547869751,
        })

        expect(checkIn.id).toEqual(expect.any(String));
    });
});
