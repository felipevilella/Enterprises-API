import 'reflect-metadata';
import 'dotenv/config';
import '../typeorm';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';

import '@shared/container/providers';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use('/antillia-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server erro - ${err.message}`,
    });
  },
);

export { app };
