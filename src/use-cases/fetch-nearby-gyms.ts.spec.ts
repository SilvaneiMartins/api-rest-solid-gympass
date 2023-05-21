import { expect, describe, it, beforeEach } from 'vitest';

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms User Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Sam Academia',
            description: 'Academia Sam',
            phone: '123456789',
            latitude: -12.739099294372798,
            longitude: -60.13436425771031,
        });

        await gymsRepository.create({
            title: 'Martins Academia',
            description: 'Academia Sam',
            phone: '123456789',
            latitude: -12.834520179246585,
            longitude: -60.07349113835748, // Mais de 10 km de distância
        });

        const { gyms } = await sut.execute({
            userLatitude: -12.748735900077671,
            userLongitude: -60.15093259177976,
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'Sam Academia' }),
        ]);
    });
});
