//  Singleton pattern

export type EmailSenderSendEmailArgs = {
  toEmail: string;
};

export type EmailSenderSendEmailResponse = {
  toEmail: string;
  status: 'success' | 'error';
};

export type EmailSenderEmailApi = {
  sendEmail: () => void;
};

export default class EmailSender {
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

  async sendEmail(args: EmailSenderSendEmailArgs): Promise<EmailSenderSendEmailResponse> {
    this.validateEmailSender();

    return new Promise((resolve) => resolve({ toEmail: args.toEmail, status: 'success' }));
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
