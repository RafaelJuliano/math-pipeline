import { injectable } from 'inversify'
import { Executor } from '../interface'

@injectable()
export class Sub implements Executor {
  execute(input: number, value: number): number {
    return input - value
  }
}