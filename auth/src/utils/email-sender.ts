export type EmailApiSendEmailArgs = {
  toEmail: string;
};

export type EmailApiSendEmailResponse = {
  toEmail: string;
  status: 'success' | 'error';
};

export interface IEmailSender {
  sendSignupVerificationEmail: (args: EmailApiSendEmailArgs) => Promise<EmailApiSendEmailResponse>;
}

export interface IEmailSenderEmailApi extends IEmailSender {
  sendEmail: () => void;
}

export default class EmailSender implements IEmailSender {
  private isActive = false;

  private emailApi: IEmailSender | undefined;

  private static emailSenderInstance: EmailSender;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): EmailSender {
    if (!this.emailSenderInstance) {
      this.emailSenderInstance = new EmailSender();
    }
    return this.emailSenderInstance;
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  setEmailApi(emailApi: IEmailSender): void {
    this.emailApi = emailApi;
  }

  async sendSignupVerificationEmail(
    args: EmailApiSendEmailArgs
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
