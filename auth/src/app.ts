import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

import { signUpRouter } from './routes';
import { errorHandler } from './middlewares';

const app = express();

app.use(json());
app.use(signUpRouter);
app.use(errorHandler);

export default app;
