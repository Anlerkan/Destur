export type EmailApiSendEmailArgs = {
  toEmail: string;
};

export type EmailApiSendEmailResponse = {
  toEmail: string;
  status: 'success' | 'error';
};

export interface EmailSenderEmailApi {
  sendEmail: (args: EmailApiSendEmailArgs) => Promise<EmailApiSendEmailResponse>;
}

export default class EmailSender implements EmailSenderEmailApi {
  private isActive = false;

  private emailApi: EmailSenderEmailApi | undefined;

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

  setEmailApi(emailApi: EmailSenderEmailApi): void {
    this.emailApi = emailApi;
  }

  async sendEmail(args: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
    this.validateEmailSender();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.emailApi!.sendEmail(args);
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
