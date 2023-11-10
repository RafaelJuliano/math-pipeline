import { injectable } from 'inversify'
import { Executor } from '../interface'

@injectable()
export class Add implements Executor {
  execute(input: number, value: number): number {
    return input + value
  }
}
