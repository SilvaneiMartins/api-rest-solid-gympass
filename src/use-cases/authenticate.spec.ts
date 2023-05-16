import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-erro';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate User Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it('should be able to authenticate', async () => {
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
        await expect(() => sut.execute({
            email: 'johndoe@email.com',
            password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should not able to authenticate with wrong password', async () => {
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
