import {
  EmailApi,
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse
} from '../utils/email-sender/types';

export const mockSendSignupVerificationEmail = jest.fn(
  (toEmail): Promise<EmailApiSendEmailResponse> =>
    new Promise((resolve) => resolve({ toEmail, status: 'success' }))
);
export const mockSendEmail = jest.fn();

export class MockEmailApi implements EmailApi {
  sendSignupVerificationEmail({
    toEmail
  }: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
    this.sendEmail();

    return mockSendSignupVerificationEmail(toEmail);
  }

  protected sendEmail(): void {
    return mockSendEmail();
  }
}
