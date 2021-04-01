import { SmptServer, SmptServerConfig } from './types';

export default class NodeMailerAppSmtpServer implements SmptServer {
  private host = 'localhost';

  private port = 1025;

  private user = 'project.1';

  private pass = 'secret.1';

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
