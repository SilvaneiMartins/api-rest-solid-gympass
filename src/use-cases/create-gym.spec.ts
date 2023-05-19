import { Decimal } from '@prisma/client/runtime';
import { expect, describe, it, beforeEach } from 'vitest';

import { CreateGymUseCase } from './create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory';

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymRepository);
    });

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'Academia Sam',
            description: 'Academia Sam',
            phone: '123456',
            latitude: -12.748735900077671,
            longitude: -60.15093259177976,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});
