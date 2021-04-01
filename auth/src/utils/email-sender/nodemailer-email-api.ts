import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { EmailApiSendEmailArgs, EmailApiSendEmailResponse, EmailApi } from './types';
import NodeMailerAppSmtpServer from './nodemailer-smtp-server';

export default class NodemailerEmailApi implements EmailApi {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport(new NodeMailerAppSmtpServer().getConfig());
  }

  async sendSignupVerificationEmail(
    args: EmailApiSendEmailArgs
  ): Promise<EmailApiSendEmailResponse> {
    const { toEmail } = args;

    await this.sendEmail({
      toEmail
    });

    return {
      toEmail,
      status: 'success'
    };
  }

  private async sendEmail(args: EmailApiSendEmailArgs): Promise<void> {
    const { toEmail } = args;

    await this.transporter.sendMail({
      from: 'noreply@destur.com',
      to: toEmail,
      subject: 'My first email',
      text: 'This is first test email'
    });
  }
}
