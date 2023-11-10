import { Container } from "inversify";
import { TYPES } from "./types";
import { Executor, Parser } from "../interface";
import { Add, Div, ExecuterProvider, Logger, LoggerDispatcher, Runner, Sub, YamlParser } from "../model";

export const appContainer = new Container();
appContainer.bind<Runner>(TYPES.RUNNER).to(Runner).inSingletonScope();
appContainer.bind<Logger>(TYPES.LOGGER).to(Logger).inSingletonScope();
appContainer.bind<Parser>(TYPES.YAML_PARSER).to(YamlParser).inSingletonScope();
appContainer.bind<LoggerDispatcher>(TYPES.LOGGER_DISPATCHER).to(LoggerDispatcher).inSingletonScope();
appContainer.bind<ExecuterProvider>(TYPES.EXECUTOR_PROVIDER).to(ExecuterProvider)
appContainer.bind<Executor>(TYPES.ADD).to(Add).inSingletonScope()
appContainer.bind<Executor>(TYPES.SUB).to(Sub).inSingletonScope()
appContainer.bind<Executor>(TYPES.DIV).to(Div).inSingletonScope()
