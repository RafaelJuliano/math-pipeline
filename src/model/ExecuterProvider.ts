import { injectable, inject, } from 'inversify'
import { Executor, File } from '../interface'
import { TYPES } from '../container';

@injectable()
export class ExecuterProvider {
  constructor(
    @inject(TYPES.ADD) private add: Executor,
    @inject(TYPES.SUB) private sub: Executor,
    @inject(TYPES.DIV) private div: Executor,
  ) {}

  public getExecutor(type: File['steps'][0]['type']): Executor['execute'] {
    const executors = {
      'add': this.add.execute,
      'sub': this.sub.execute,
      'div': this.div.execute
    }

    return executors[type]
  }
}
