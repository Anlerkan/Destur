export type EmailApiSendEmailArgs = {
  toEmail: string;
};

export type EmailApiSendEmailResponse = {
  toEmail: string;
  status: 'success' | 'error';
};

export interface EmailApi {
  sendSignupVerificationEmail(args: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse>;
}
