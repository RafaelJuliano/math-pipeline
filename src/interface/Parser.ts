import { File } from './File';

export interface Parser {
  parseFile(filePath: string): File
}