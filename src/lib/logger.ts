export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
}

export interface LogEntry {
    timestamp: string;
    level: string;
    component: string;
    message: string;
    data?: unknown;
}

class Logger {
    private static instance: Logger;
    private logLevel: LogLevel = LogLevel.DEBUG;

    private constructor() { }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setLogLevel(level: LogLevel) {
        this.logLevel = level;
    }

    public log(level: LogLevel, component: string, message: string, data?: unknown) {
        if (level >= this.logLevel) {
            const timestamp = new Date().toISOString();
            const consoleMethod = this.getConsoleMethod(level);
            consoleMethod(`[${timestamp}] [${LogLevel[level]}] [${component}] ${message}`, data || '');

            this.persistLog();
        }
    }

    public debug(component: string, message: string, data?: unknown) {
        this.log(LogLevel.DEBUG, component, message, data);
    }

    public info(component: string, message: string, data?: unknown) {
        this.log(LogLevel.INFO, component, message, data);
    }

    public warn(component: string, message: string, data?: unknown) {
        this.log(LogLevel.WARN, component, message, data);
    }

    public error(component: string, message: string, data?: unknown) {
        this.log(LogLevel.ERROR, component, message, data);
    }

    private getConsoleMethod(level: LogLevel) {
        switch (level) {
            case LogLevel.DEBUG: return console.debug;
            case LogLevel.INFO: return console.info;
            case LogLevel.WARN: return console.warn;
            case LogLevel.ERROR: return console.error;
            default: return console.log;
        }
    }

    private persistLog() {
        // TODO: Implement persistence (e.g., IndexedDB or remote logging)
        // For now, we just keep it in memory or rely on console
    }
}

export const logger = Logger.getInstance();
