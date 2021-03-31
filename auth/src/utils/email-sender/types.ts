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

export abstract class EmailSenderEmailApi implements IEmailSender {
  abstract sendSignupVerificationEmail(
    args: EmailApiSendEmailArgs
  ): Promise<EmailApiSendEmailResponse>;

  protected abstract sendEmail(args: EmailApiSendEmailArgs): void;
}
