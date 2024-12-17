import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.method === 'POST' || req.method === 'PUT') {
      // Filter for create/update requests
      console.log('Request JSON:', req.body);
    } else {
      console.log('Request...', new Date().toISOString(), req);
    }
    //A place winston logger here for LOKI logging
    next();
  }
}
