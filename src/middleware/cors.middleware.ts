import { Injectable, NestMiddleware, RequestMethod, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CROSS_DOMAIN } from '../../app.config';
import { isDevMode } from '../../app.environment';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const getMethod = method => RequestMethod[method];
    const origins = req.headers.origin;
    const origin = (Array.isArray[origins] ? origins[0] : origins) || '';

    const allowedOrigins = [...CROSS_DOMAIN.allowedOrigins];
    const allowedMethods = [
      RequestMethod.GET,
      RequestMethod.HEAD,
      RequestMethod.PUT,
      RequestMethod.PATCH,
      RequestMethod.POST,
      RequestMethod.DELETE
    ];
    const allowedHeaders = [
      'Authorization',
      'Origin',
      'No-Cache',
      'X-Requested-With',
      'If-Modified-Since',
      'Pragma',
      'Last-Modified',
      'Cache-Control',
      'Expires',
      'Content-Type',
      'X-E4M-With'
    ];

    if(!origin || allowedOrigins.includes(origin) || !isDevMode){
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }

    res.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
    res.header('Access-Control-Allow-Methods', allowedMethods.map(getMethod).join(','));
    res.header('Access-Control-Max-Age', '600');
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('X-Powered-By', 'Ananas');

    if(req.method === getMethod(RequestMethod.OPTIONS)){
      return res.sendStatus(HttpStatus.NO_CONTENT);
    }else{
      return next();
    }
  }
}
