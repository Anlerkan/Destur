export type EmailApiSendEmailArgs = {
  toEmail: string;
};

export type EmailApiSendEmailResponse = {
  toEmail: string;
  status: 'success' | 'error';
};

export type SmptServerConfigAuth = {
  user: string;
  pass: string;
};

export type SmptServerConfig = {
  host: string;
  port: number;
  auth: SmptServerConfigAuth;
};

export interface EmailApi {
  sendSignupVerificationEmail(args: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse>;
}

export interface SmptServer {
  getConfig(): SmptServerConfig;
}
