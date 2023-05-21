import { expect, describe, it, beforeEach } from 'vitest';

import { SearchGymsUseCase } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms User Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);
    });

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'Sam Academia',
            description: 'Academia Sam',
            phone: '123456789',
            latitude: -12.748735900077671,
            longitude: -60.15093259177976,
        });

        await gymsRepository.create({
            title: 'Martins Academia',
            description: 'Academia Sam',
            phone: '123456789',
            latitude: -12.748735900077671,
            longitude: -60.15093259177976,
        });

        const { gyms } = await sut.execute({
            query: 'Sam',
            page: 1,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Sam Academia' }),
        ]);
    });

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `Sam Academia ${i}`,
                description: 'Academia Sam',
                phone: '123456789',
                latitude: -12.748735900077671,
                longitude: -60.15093259177976,
            });
        }

        const { gyms } = await sut.execute({
            query: 'Sam',
            page: 2,
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Sam Academia 21' }),
            expect.objectContaining({ title: 'Sam Academia 22' }),
        ]);
    });
});
