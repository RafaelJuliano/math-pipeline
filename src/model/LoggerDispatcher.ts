import EventEmitter from 'events'
import { inject, injectable } from 'inversify';
import { TYPES } from '../container';
import { Logger } from './Logger';

@injectable()
export class LoggerDispatcher {
  private emitter: EventEmitter

  constructor(@inject(TYPES.LOGGER) private logger: Logger) {
    this.emitter = new EventEmitter()
    this.addListeners()
  }

  public startExecution(file: object): void {
    this.emitter.emit('startExecution', file)
  }

  public endExecution(result: number): void {
    this.emitter.emit('endExecution', result)
  }

  public stepResult(step: string, result: number): void {
    this.emitter.emit('stepResult', step, result)
  }

  public info(message: string, ...meta: any[]): void {
    this.emitter.emit('info', message, ...meta)
  }

  public warn(message: string, ...meta: any[]): void {
    this.emitter.emit('warn', message, ...meta)
  }

  public error(message: string, ...meta: any[]): void {
    this.emitter.emit('error', message, ...meta)
  }

  private addListeners(): void {
    this.logger.info('Creating listeners')

    this.emitter.on('startExecution', (file: object) => {
      this.logger.info('Starting execution', {
        file,
      })
    })

    this.emitter.on('endExecution', (result: number) => {
      this.logger.info('Finish execution', {
        result,
      })
    })

    this.emitter.on('stepResult', (step: string, result: number) => {
      this.logger.info('Step result', {
        step,
        result,
      })
    })

    this.emitter.on('info', (message: string, ...meta: any[]) => {
      this.logger.info(message, ...meta)
    })

    this.emitter.on('warn', (message: string, ...meta: any[]) => {
      this.logger.warn(message, ...meta)
    })

    this.emitter.on('error', (message: string, ...meta: any[]) => {
      this.logger.error(message, ...meta)
    })
  }
}