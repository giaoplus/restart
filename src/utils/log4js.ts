import * as Path from 'path';
import * as log4js from 'log4js';
import * as StackTrace from 'stacktrace-js';
import log4jsConfig from '../config/log4js';

log4js.configure(log4jsConfig);
const log = log4js.getLogger();
const infoLog = log4js.getLogger('info');
const warnLog = log4js.getLogger('warn');
const errorLog = log4js.getLogger('error');

export class Logger {
    static log(...args) {
        log.debug(Logger.getStackTrace(), ...args)
    }

    static info(...args) {
        infoLog.info(Logger.getStackTrace(), ...args)
    }

    static warn(...args) {
        warnLog.warn(Logger.getStackTrace(), ...args)
    }

    static error(...args) {
        errorLog.error(Logger.getStackTrace(), ...args)
    }

    static getStackTrace(deep: number = 2):string {
        const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
        const stackInfo: StackTrace.StackFrame = stackList[deep];
        const lineNumber: number = stackInfo.lineNumber;
        const columnNumber: number = stackInfo.columnNumber;
        const fileName: string = stackInfo.fileName;
        const basename: string = Path.basename(fileName);
        return `${basename} (line: ${lineNumber}, column: ${columnNumber}): `;
    }
}