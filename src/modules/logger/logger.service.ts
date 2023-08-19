import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLoggerService implements LoggerService {
  log(message: string) {
    process.stdout.write('[Log] ' + message);
  }

  error(error: any) {
    process.stdout.write('[Error] ' + JSON.stringify(error));
  }

  warn(message: string) {
    process.stdout.write('[Warn] ' + message);
  }
}
