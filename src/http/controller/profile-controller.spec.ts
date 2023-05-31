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

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to get user profile', async () => {
        await request(app.server)
            .post(`${env.APP_VERSAO_URL}/users/register`)
            .send({
                name: 'John Doe',
                email: 'johndoe@email.com',
                password: '123456',
            })

        const authResponse = await request(app.server)
            .post(`${env.APP_VERSAO_URL}/sessions`)
            .send({
                email: 'johndoe@email.com',
                password: '123456',
            })

        const { token } = authResponse.body;

        const profileResponse = await request(app.server)
            .get(`${env.APP_VERSAO_URL}/profile/me`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200);
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'johndoe@email.com',
            })
        );
    })
});
