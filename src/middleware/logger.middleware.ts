import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: () => void) {
//     const code = res.statusCode;
//     next()

//     // if(code != 200){
//       const logFormat = {
//         'Request original url': req.originalUrl,
//         'Methods': req.method,
//         'IP': req.ip,
//         'Status Code': code,
//         'params': req.param,
//         'query': req.query,
//         'body': req.body
//       };
//       if(code >= 500){
//         Logger.error(JSON.stringify(logFormat));
//       }else if(code >= 400){
//         Logger.warn(JSON.stringify(logFormat));
//       }else{
//         Logger.info(JSON.stringify(logFormat));
//       }
//     // }
//   }
// }

export function logger(req: Request, res: Response, next: () => void) {
  const code = res.statusCode;
  next()

  const logFormat = {
    'Request original url': req.originalUrl,
    'Methods': req.method,
    'IP': req.ip,
    'Status Code': code,
    'params': req.param,
    'query': req.query,
    'body': req.body
  };
  if(code >= 500){
    Logger.error(JSON.stringify(logFormat));
  }else if(code >= 400){
    Logger.warn(JSON.stringify(logFormat));
  }else{
    Logger.info(JSON.stringify(logFormat));
  }
}
