import { Decimal } from '@prisma/client/runtime';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';

import { CheckInUseCase } from './check-in';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { InMemoryCheckInsRepository, InMemoryGymsRepository } from '@/repositories/in-memory';

let usersRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In User Case', () => {
    beforeEach(async  () => {
        usersRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(usersRepository, gymsRepository);

        await gymsRepository.create({
            id: 'any_gym_id',
            title: 'Academia Sam',
            description: 'Academia Sam',
            phone: '123456789',
            latitude: -12.748735900077671,
            longitude: -60.15093259177976,
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
            userLatitude: -12.748735900077671,
            userLongitude: -60.15093259177976,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should be able to check in twice in the day', async () => {
        vi.setSystemTime(new Date(2023, 4, 18, 8, 0, 0));

        await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
            userLatitude: -12.748735900077671,
            userLongitude: -60.15093259177976,
        });

        await expect(() =>
            sut.execute({
                userId: 'any_user_id',
                gymId: 'any_gym_id',
                userLatitude: -12.748735900077671,
                userLongitude: -60.15093259177976,
            }),
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2023, 4, 17, 8, 0, 0));

        await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
            userLatitude: -12.748735900077671,
            userLongitude: -60.15093259177976,
        });

        vi.setSystemTime(new Date(2023, 4, 18, 8, 0, 0));

        const { checkIn } = await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
            userLatitude: -12.748735900077671,
            userLongitude: -60.15093259177976,
        })

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should not be able to check in on distant gym', async () => {
        gymsRepository.items.push({
            id: 'any_user_id_2',
            title: 'Academia Sam',
            description: 'Academia Sam',
            phone: '123456789',
            latitude: new Decimal(-12.739347297559348),
            longitude: new Decimal(-60.139611103413515),
        });

        await expect(() =>
            sut.execute({
                userId: 'any_user_id',
                gymId: 'any_user_id_2',
                userLatitude: -12.748735900077671,
                userLongitude: -60.15093259177976,
            }),
        ).rejects.toBeInstanceOf(MaxDistanceError);
    });
});
