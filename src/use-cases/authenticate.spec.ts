import { hash } from 'bcryptjs';
import { expect, describe, it } from 'vitest';

import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-erro';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

describe('Authenticate User Case', () => {
    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6)
        });

        const { user } = await sut.execute({
            email: 'johndoe@email.com',
            password: '123456',
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should not able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);

        await expect(() => sut.execute({
            email: 'johndoe@email.com',
            password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateUseCase(usersRepository);

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6)
        });

        await expect(() => sut.execute({
            email: 'johndoe@email.com',
            password: '123123',
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
