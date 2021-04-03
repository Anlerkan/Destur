import { EmailSender } from '../../index';
import { MockEmailApi, mockSendSignupVerificationEmail } from '../../../test-utils/mock-email-api';

it('should throw an error when sending an email if the EmailSender is deactivated', async () => {
  const emailSender = EmailSender.getInstance();

  emailSender.deactivate();

  await expect(
    emailSender.sendSignupVerificationEmail({ toEmail: 'test@test.com' })
  ).rejects.toThrowError('EmailSender is not active');
});

it('should throw an error when sending an email if the EmailApi is not set', async () => {
  const emailSender = EmailSender.getInstance();

  emailSender.activate();

  await expect(
    emailSender.sendSignupVerificationEmail({ toEmail: 'test@test.com' })
  ).rejects.toThrowError('EmailApi is not set');
});

it('should send the signup verification mail if the sender is active and the EmailApi is set', async () => {
  const emailSender = EmailSender.getInstance();
  const mockEmailApi = new MockEmailApi();

  emailSender.activate();
  emailSender.setEmailApi(mockEmailApi);

  const res = await emailSender.sendSignupVerificationEmail({ toEmail: 'test@test.com' });

  expect(res.toEmail).toEqual('test@test.com');
  expect(mockSendSignupVerificationEmail).toHaveBeenCalledTimes(1);
});
