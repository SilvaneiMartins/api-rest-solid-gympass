import { expect, describe, it, beforeEach, afterEach } from 'vitest';

import { ValidateCheckInUserCase } from './validate-check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory';
import { ResourceNotFoundError } from './errors/resource-not-found-exists';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUserCase;

describe('Validate Check In User Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUserCase(checkInsRepository);

        // vi.useFakeTimers();
    });

    afterEach(() => {
        // vi.useFakeTimers();
    });

    it('should not be able to validated an inexistent check-in', async () => {
        await expect(
            sut.execute({
                checkInId: 'inexistent-check-in-id',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
