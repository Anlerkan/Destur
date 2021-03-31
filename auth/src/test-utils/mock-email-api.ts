import {
  EmailSenderEmailApi,
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse
} from '../utils/email-sender';

export const mockSendSignupVerificationEmail = jest.fn();

export class MockEmailApi implements EmailSenderEmailApi {
  sendSignupVerificationEmail(_args: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
    return mockSendSignupVerificationEmail();
  }
}
