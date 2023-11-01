import pino from 'pino';

const pinoConfig = {
  level: process.env.LOG_LEVEL,
  formatters: {
    level: (label: string) => {
      return {
        level: label,
      };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  browser: {
    asObject: true,
  },
};

const logger = pino(pinoConfig);

export const loggerError = (message: string, ...args: any[]) => {
  return logger.error(message, args);
};

export const loggerWarn = (message: string, ...args: any[]) => {
  return logger.warn(message, args);
};

export const loggerInfo = (message: string, ...args: any[]) => {
  return logger.info(message, args);
};

export const loggerDebug = (message: string, ...args: any[]) => {
  return logger.debug(message, args);
};
