import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: AppLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestLog = `url: ${req.baseUrl}, query: ${JSON.stringify(
      req.query,
    )}, body: ${JSON.stringify(req.body)}, statusCode: ${res.statusCode}`;

    this.loggerService.log(requestLog);

    next();
  }
}
