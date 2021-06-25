import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { signUpRouter, verifyRouter, loginRouter } from './routes';
import { errorHandler } from './middlewares';

const app = express();

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false
};

app.use(cors(options));
app.use(json());
app.use(cookieParser());

app.use(signUpRouter);
app.use(verifyRouter);
app.use(loginRouter);

app.use(errorHandler);

export default app;
