import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException | ZodValidationException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof ZodValidationException) {
      return response.status(400).json({
        statusCode: 400,
        message: '요청값 검증에 실패했습니다.',
        timestamp: new Date().toISOString(),
        path: request.url,
        errors: exception.getZodError().issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
