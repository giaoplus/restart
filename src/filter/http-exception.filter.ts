import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const code = exception.getStatus();
    const logFormat = {
      'Request original url': req.originalUrl,
      'Methods': req.method,
      'IP': req.ip,
      'Status Code': code,
      'error': exception.message,
      'msg': exception.toString()
    };
    Logger.error(JSON.stringify(logFormat));
    res.status(code).json({
      statusCode: code,
      error: exception.message,
      msg: `${code >= 500 ? 'Service Error' : 'Client Error'}`
    });
  }
}
