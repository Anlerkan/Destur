/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SmptServer, SmptServerConfig } from './types';

export default class NodeMailerAppSmtpServer implements SmptServer {
  private host = process.env.SMTP_HOST!;

  // eslint-disable-next-line radix
  private port = parseInt(process.env.SMTP_PORT!);

  private user = process.env.SMTP_APIKEY_PUBLIC!;

  private pass = process.env.SMTP_APIKEY_PRIVATE!;

  getConfig(): SmptServerConfig {
    return {
      host: this.host,
      port: this.port,
      auth: {
        user: this.user,
        pass: this.pass
      }
    };
  }
}
