import { WrongCredentials } from '../index';

it('should have a status code of 401', () => {
  const duplicatedEmailError = new WrongCredentials();

  expect(duplicatedEmailError.getStatusCode()).toEqual(401);
});

it('should return the errors in the serialized format', () => {
  const duplicatedEmailError = new WrongCredentials();
  const serializedErrorOutput = duplicatedEmailError.serializeErrorOutput();

  expect(serializedErrorOutput.errors).toHaveLength(1);
  expect(serializedErrorOutput.errors[0].message).toEqual('Wrong credentials provided');
});
