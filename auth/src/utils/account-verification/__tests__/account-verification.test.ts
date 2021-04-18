import { generateAccountVerificationToken } from '../index';

describe('tests the token generation function', () => {
  it('should produce a string of lenth 64', () => {
    expect(generateAccountVerificationToken()).toHaveLength(64);
  });
});
