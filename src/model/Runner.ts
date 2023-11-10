import { inject, injectable } from 'inversify';
import { TYPES } from '../container';
import { File, Parser } from '../interface';
import { LoggerDispatcher } from './LoggerDispatcher';
import { ExecuterProvider } from './ExecuterProvider';


@injectable()
export class Runner {
  constructor(
    @inject(TYPES.YAML_PARSER) private fileParser: Parser,
    @inject(TYPES.LOGGER_DISPATCHER) private loggerDispatcher: LoggerDispatcher,
    @inject(TYPES.EXECUTOR_PROVIDER) private executorProvider: ExecuterProvider
  ) {}

  public run(): void {
    const file = this.getFile()
    this.loggerDispatcher.startExecution(file)
    let lastResult = 0

    for (const { stepName, result } of this.runSteps(file)) {
      lastResult = result
      this.loggerDispatcher.stepResult(stepName, result)
    }

    this.loggerDispatcher.endExecution(lastResult)
  }

  private *runSteps(file: File): Generator<{ stepName: string, result: number }> {
    const { initialValue, steps } = file
    let result: number | undefined
    const stepsContent = Object.entries(steps)

    for (const [stepName, content] of stepsContent) {
      const executor = this.getProvider(content.type)
      result = executor(result || initialValue, content.value)
      yield { stepName, result }
    }
  }

  private getFile(): File {
    const filePath = process.argv.slice(2)[0];
    return this.fileParser.parseFile(filePath)
  }

  private getProvider(type: File['steps'][0]['type']) {
    return this.executorProvider.getExecutor(type)
  }
}