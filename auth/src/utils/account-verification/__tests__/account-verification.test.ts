import { generateEmailVerificationToken } from '../index';

describe('tests the token generation function', () => {
  it('should produce a string of lenth 64', () => {
    expect(generateEmailVerificationToken()).toHaveLength(64);
  });
});
