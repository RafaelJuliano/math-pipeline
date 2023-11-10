import { injectable } from 'inversify';
import winston from 'winston';

@injectable()
export class Logger {
  private logger: winston.Logger

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'math-pipeline' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
      ],
    })
  }

  public info(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta)
  }

  public warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta)
  }

  public error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta)
  }
}