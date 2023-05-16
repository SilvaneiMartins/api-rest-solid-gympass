import { expect, describe, it, beforeEach } from 'vitest';

import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';

let usersRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check In User Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(usersRepository);
    });

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'any_user_id',
            gymId: 'any_gym_id',
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});
