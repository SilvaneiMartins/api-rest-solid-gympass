import {
    it,
    expect,
    describe,
    afterAll,
    beforeAll,
} from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { env } from '@/env';

describe('Authenticate (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to authenticate', async () => {
        await request(app.server).post(`${env.APP_VERSAO_URL}/users/register`).send({
            name: 'John Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        })

        const response = await request(app.server).post(`${env.APP_VERSAO_URL}/sessions`).send({
            email: 'jhondoe@example.com',
            password: '123456',
        })

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String),
        });
    });
});
