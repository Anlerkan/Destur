import {
  IEmailSenderEmailApi,
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse
} from '../utils/email-sender';

export const mockSendSignupVerificationEmail = jest.fn(
  (toEmail): Promise<EmailApiSendEmailResponse> =>
    new Promise((resolve) => resolve({ toEmail, status: 'success' }))
);
export const mockSendEmail = jest.fn();

export class MockEmailApi implements IEmailSenderEmailApi {
  sendSignupVerificationEmail({
    toEmail
  }: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
    this.sendEmail();

    return mockSendSignupVerificationEmail(toEmail);
  }

  sendEmail(): void {
    return mockSendEmail();
  }
}
