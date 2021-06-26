import dotenv from 'dotenv-safe';
import mongoose from 'mongoose';

import app from './app';
import { EmailSender, NodeMailerEmailApi } from './utils';

const parsedNodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({
  path: parsedNodeEnv === 'development' ? '.env.dev' : '.env.production'
});

const emailSender = EmailSender.getInstance();

emailSender.activate();
emailSender.setEmailApi(new NodeMailerEmailApi());

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wil9t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => app.listen(3000, () => console.log('Backend is running')))
  .catch((err) => console.log(err));
