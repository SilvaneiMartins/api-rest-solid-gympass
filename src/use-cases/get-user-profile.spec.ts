import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-exists';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile User Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    });

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6)
        });

        const { user } = await sut.execute({
            userId: createdUser.id,
        });

        expect(user.name).toEqual('John Doe');
    });

    it('should not able to get user profile with wrong id', async () => {
        await expect(() => sut.execute({
            userId: 'non-existing-user-id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
