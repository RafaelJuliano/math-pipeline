import { injectable } from 'inversify'
import { Executor } from '../interface'

@injectable()
export class Div implements Executor {
  execute(input: number, value: number): number {
    return input / value
  }
}