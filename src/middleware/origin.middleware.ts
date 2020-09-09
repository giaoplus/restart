import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CROSS_DOMAIN } from '../../app.config';
import { isProdMode } from '../../app.environment';

@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if(isProdMode){
      const { origin, referer } = req.headers;
      const checkHeader = field => !field || field.includes(CROSS_DOMAIN.allowedOrigins);
      const isVerifiedOrigin = checkHeader(origin);
      const isVerifiedReferer = checkHeader(referer);
      if(!isVerifiedOrigin && !isVerifiedReferer){
        return res.status(HttpStatus.UNAUTHORIZED).jsonp({
          status: 'error',
          message: '胡阿尤'
        });
      }
    }

    return next();
  }
}
