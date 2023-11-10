import 'reflect-metadata'
import { TYPES, appContainer } from './container';
import { Runner } from './model';

const runner = appContainer.get<Runner>(TYPES.RUNNER)

runner.run()