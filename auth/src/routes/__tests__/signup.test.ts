import request from 'supertest';

import app from '../../app';
import { SIGNUP_ROUTE } from '../signup';

// it('should return a 405 for non-post request to the signup route', () => {

// });

/*
 *  Available methods in /api/auth/signup:
 *    - POST
 */
describe('tests signup route method availability', () => {
  let password = '';
  let email = '';

  beforeAll(() => {
    password = 'Valid12valid12';
    email = 'test@test.com';
  });

  it('should return 405 for GET, PUT, PATCH, DELETE requests', async () => {
    await request(app).get(SIGNUP_ROUTE).send({ email, password }).expect(405);
    await request(app).put(SIGNUP_ROUTE).send({ email, password }).expect(405);
    await request(app).patch(SIGNUP_ROUTE).send({ email, password }).expect(405);
    await request(app).delete(SIGNUP_ROUTE).send({ email, password }).expect(405);
  });

  it('should return 200 for POST, OPTIONS requests', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password }).expect(200);
    await request(app).options(SIGNUP_ROUTE).expect(200);
  });

  it('should return POST and OPTIONS as the only allowed method from an OPTIONS request', async () => {
    const response = await request(app).options(SIGNUP_ROUTE).expect(200);

    expect(response.get('access-control-allow-methods')).toContain('POST');
    expect(response.get('access-control-allow-methods')).toContain('OPTIONS');
  });
});

/*
 *  Valid email conditions:
 *    - Standard email formats form 'express-validator' package
 */
describe('tests validity of email input', () => {
  let password = '';

  beforeAll(() => {
    password = 'Validpassword1';
  });

  it('should return a 422 if the email is not provided', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ password }).expect(422);
  });

  it('should return a 422 if the email is not valid', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email: 'invalidEmail', password }).expect(422);
    await request(app).post(SIGNUP_ROUTE).send({ email: '@test.com', password }).expect(422);
  });

  it('should return 200 if the email is valid', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email: 'test@test.com', password }).expect(200);
  });
});

/*
 *  Valid password conditions:
 *    - At least 8 characters
 *    - At most 32 characters
 *    - One lower-case letter
 *    - One upper-case letter
 *    - At least 1 digit
 */
describe('testS validity of password input', () => {
  let email = '';

  beforeAll(() => {
    email = 'test@test.com';
  });

  it('should return 422 if the password is not provided', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email }).expect(422);
  });

  it('should return 422 if the password contains less than 8 characters', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: 'Valid12' }).expect(422);
  });

  it('should return 422 if the password contains more than 32 characters', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: 'Valid12Valid12Valid12Valid12Valid12Valid12Valid12' })
      .expect(422);
  });

  it('should return 422 if the password does not contain less one lower-case letter', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: 'VALID12VALID12' }).expect(422);
  });

  it('should return 422 if the password does not contain one upper case letter', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: 'valid12valid12' }).expect(422);
  });

  it('should return 422 if the password does not contain a number', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: 'Validvalid' }).expect(422);
  });

  it('should return 200 if the password is valid', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: 'Valid12valid12' }).expect(200);
  });
});
