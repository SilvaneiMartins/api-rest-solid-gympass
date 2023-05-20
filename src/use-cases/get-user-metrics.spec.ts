import { expect, describe, it, beforeEach } from 'vitest';

import { GetUserMetricsUseCase } from './get-user-metrics';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Fetch User Metrics User Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMetricsUseCase(checkInsRepository);
    });

    it('should be able to get check ins count from metrics', async () => {
        await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-01',
        });

        await checkInsRepository.create({
            user_id: 'user-01',
            gym_id: 'gym-02',
        });

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        });

        expect(checkInsCount).toEqual(2);
    });
});
