import dotenv from 'dotenv-safe';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import app from './app';
import { EmailSender, NodeMailerEmailApi } from './utils';

dotenv.config({
  path: '.env.dev'
});
const mongoMemoryServer = new MongoMemoryServer();
const emailSender = EmailSender.getInstance();

emailSender.activate();
emailSender.setEmailApi(new NodeMailerEmailApi());

app.listen(3000, async () => {
  const mongoUri = await mongoMemoryServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('Listening on port 3000');
});
