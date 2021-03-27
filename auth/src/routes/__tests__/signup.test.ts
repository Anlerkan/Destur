import request from 'supertest';

import app from '../../app';

// it('should return a 405 for non-post request to the signup route', () => {

// });

it('should return a 422 if the email is not valid', async () => {
  await request(app).post('/api/auth/signup').send({}).expect(422);
  await request(app).post('/api/auth/signup').send({ email: 'invalidEmail' }).expect(422);
  await request(app).post('/api/auth/signup').send({ email: '@test.com' }).expect(422);
});
