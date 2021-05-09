import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cors from 'cors';

import { signUpRouter } from './routes';
import { errorHandler } from './middlewares';

const app = express();

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:3000/',
  preflightContinue: false
};

app.use(cors(options));
app.use(json());
app.use(signUpRouter);
app.use(errorHandler);

export default app;
