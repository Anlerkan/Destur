import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { EmailApiSendEmailArgs, EmailApiSendEmailResponse, EmailSenderEmailApi } from './types';

export default class NodemailerEmailApi extends EmailSenderEmailApi {
  private transporter: Mail;

  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      auth: {
        user: 'project.1',
        pass: 'secret.1'
      }
    });
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

  protected async sendEmail(args: EmailApiSendEmailArgs): Promise<void> {
    const { toEmail } = args;

    await this.transporter.sendMail({
      from: 'noreply@destur.com',
      to: toEmail,
      subject: 'My first email',
      text: 'This is first test email'
    });
  }
}
