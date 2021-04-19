import {
  EmailApi,
  EmailApiSendEmailResponse,
  EmailApiSendSignupVerificationEmailArgs
} from './types';

export default class EmailSender implements EmailApi {
  private isActive = false;

  private emailApi: EmailApi | undefined;

  private static emailSenderInstance: EmailSender;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): EmailSender {
    if (!this.emailSenderInstance) {
      this.emailSenderInstance = new EmailSender();
    }
    return this.emailSenderInstance;
  }

  static resetEmailSenderInstance(): void {
    this.emailSenderInstance = new EmailSender();
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  setEmailApi(emailApi: EmailApi): void {
    this.emailApi = emailApi;
  }

  async sendSignupVerificationEmail(
    args: EmailApiSendSignupVerificationEmailArgs
  ): Promise<EmailApiSendEmailResponse> {
    this.validateEmailSender();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.emailApi!.sendSignupVerificationEmail(args);
  }

  private validateEmailSender(): void {
    if (!this.isActive) {
      throw new Error('EmailSender is not active');
    }

    if (!this.emailApi) {
      throw new Error('EmailApi is not set');
    }
  }
}
