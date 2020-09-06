import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from 'src/utils/log4js';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const code = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const logFormat = {
      'Request original url': req.originalUrl,
      'Methods': req.method,
      'IP': req.ip,
      'Status Code': code,
      'response': exception
    };
    Logger.error(JSON.stringify(logFormat));
    res.status(code).json({
      statusCode: code,
      msg: `Service Error: ${exception}`
    });
  }
}
