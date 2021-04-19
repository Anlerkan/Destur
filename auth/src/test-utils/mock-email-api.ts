import {
  EmailApi,
  EmailApiSendEmailResponse,
  EmailApiSendSignupVerificationEmailArgs
} from '../utils/email-sender/types';

export const mockSendSignupVerificationEmail = jest.fn(
  (toEmail): Promise<EmailApiSendEmailResponse> =>
    new Promise((resolve) => resolve({ toEmail, status: 'success' }))
);

export class MockEmailApi implements EmailApi {
  sendSignupVerificationEmail({
    toEmail
  }: EmailApiSendSignupVerificationEmailArgs): Promise<EmailApiSendEmailResponse> {
    return mockSendSignupVerificationEmail(toEmail);
  }
}
