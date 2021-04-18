import { randomBytes } from 'crypto';

import { User } from '../index';
import { BaseCustomError, DuplicatedEmail } from '../../errors';
import { PasswordHash } from '../../utils';

describe('test the user mongoose model', () => {
  const userInfo = {
    email: 'test@test.com',
    password: 'Valid123'
  };

  it('should not save a new user if the email is already in the database', async () => {
    const newUser1 = await User.create(userInfo);

    expect(newUser1).toBeDefined();
    expect(newUser1.email).toEqual(userInfo.email);

    let err: DuplicatedEmail | undefined;

    try {
      await User.create(userInfo);
    } catch (e) {
      err = e;
    }

    const serializedErrorOutput = err?.serializeErrorOutput();

    expect(err).toBeDefined();
    expect(err).toBeInstanceOf(BaseCustomError);
    expect(serializedErrorOutput).toBeDefined();
    expect(serializedErrorOutput?.errors[0].message).toEqual(
      'The email is already in the database'
    );
  });

  it('should encrypt the password when creating the user', async () => {
    const newUser = await User.create(userInfo);

    expect(newUser.password).not.toEqual(userInfo.password);
    expect(newUser.password.split('.')).toHaveLength(2);
    expect(newUser.password.split('.')[1].length).toEqual(randomBytes(16).toString('hex').length);
  });

  it('should return true when comparing the hashed password with its original providedPassword', async () => {
    const newUser = await User.create(userInfo);

    expect(
      PasswordHash.compareSync({ storedPassword: newUser.password, providedPassword: '1234' })
    ).toEqual(false);

    expect(
      PasswordHash.compareSync({
        storedPassword: newUser.password,
        providedPassword: userInfo.password
      })
    ).toEqual(true);
  });

  it('should set isVerified to false when the value is not provided', async () => {
    const newUser = await User.create(userInfo);

    expect(newUser.isVerified).toEqual(false);
  });

  it('should set isVerified to false on first save,even if the provided value is set to true', async () => {
    const newUser = await User.create({ ...userInfo, isVerified: true });

    expect(newUser.isVerified).toEqual(false);
  });

  it('should allow to change isVerified to true if the user already exists', async () => {
    const newUser = await User.create(userInfo);

    const updatedUser = await User.findOneAndUpdate(
      { _id: newUser._id },
      { isVerified: true },
      { new: true }
    );

    expect(updatedUser).toBeDefined();
    expect(updatedUser!.isVerified).toEqual(true);
  });
});
