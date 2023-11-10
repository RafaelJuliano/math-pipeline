import fs from 'fs'
import { injectable } from 'inversify'
import { parse } from 'yaml'
import { File, Parser } from '../interface'

@injectable()
export class YamlParser implements Parser {
  public parseFile(filePath: string): File {
    const file = fs.readFileSync(filePath, 'utf8')
    return parse(file)
  }
}
