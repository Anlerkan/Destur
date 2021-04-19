import { EmailSender } from '../../index';
import { MockEmailApi, mockSendSignupVerificationEmail } from '../../../test-utils/mock-email-api';

const sendSignupVerificationArgs = {
  toEmail: 'test@test.com',
  emailVerificationToken: 'whatever'
};

it('should throw an error when sending an email if the EmailSender is deactivated', async () => {
  const emailSender = EmailSender.getInstance();

  emailSender.deactivate();

  await expect(
    emailSender.sendSignupVerificationEmail(sendSignupVerificationArgs)
  ).rejects.toThrowError('EmailSender is not active');
});

it('should throw an error when sending an email if the EmailApi is not set', async () => {
  const emailSender = EmailSender.getInstance();

  emailSender.activate();

  await expect(
    emailSender.sendSignupVerificationEmail(sendSignupVerificationArgs)
  ).rejects.toThrowError('EmailApi is not set');
});

it('should send the signup verification mail if the sender is active and the EmailApi is set', async () => {
  const emailSender = EmailSender.getInstance();
  const mockEmailApi = new MockEmailApi();

  emailSender.activate();
  emailSender.setEmailApi(mockEmailApi);

  const res = await emailSender.sendSignupVerificationEmail(sendSignupVerificationArgs);

  expect(res.toEmail).toEqual('test@test.com');
  expect(mockSendSignupVerificationEmail).toHaveBeenCalledTimes(1);
});
