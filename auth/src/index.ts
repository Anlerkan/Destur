import dotenv from 'dotenv-safe';

import app from './app';
import { EmailSender, NodeMailerEmailApi } from './utils';

dotenv.config({
  path: '.env.dev'
});

const emailSender = EmailSender.getInstance();

emailSender.activate();
emailSender.setEmailApi(new NodeMailerEmailApi());

app.listen(3000, async () => {
  console.log('Listening on port 3000');
});
