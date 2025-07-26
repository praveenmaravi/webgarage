// src/utils/logger.ts

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LoggerOptions {
  module?: string;            // e.g., 'GarageBot', 'AnimationEditor'
  level?: LogLevel;
  devOnly?: boolean;
}

const isDev = process.env.NODE_ENV !== 'production';

const colors = {
  info: 'color: #36A2EB',
  warn: 'color: #FFCE56',
  error: 'color: #FF6384',
  debug: 'color: #9B59B6',
};

function log(message: any, options: LoggerOptions = {}) {
  const {
    module = 'App',
    level = 'info',
    devOnly = false,
  } = options;

  if (devOnly && !isDev) return;

  const tag = `[${module}]`;
  const levelLabel = level.toUpperCase();

  const styledTag = `%c${tag}`;
  const styledLevel = `%c${levelLabel}`;

  const styleTag = 'color: #2ECC71; font-weight: bold';
  const styleLevel = colors[level] || '';

  switch (level) {
    case 'info':
    case 'debug':
      console.log(`${styledTag} ${styledLevel}`, styleTag, styleLevel, message);
      break;
    case 'warn':
      console.warn(`${styledTag} ${styledLevel}`, styleTag, styleLevel, message);
      break;
    case 'error':
      console.error(`${styledTag} ${styledLevel}`, styleTag, styleLevel, message);
      break;
    default:
      console.log(`${styledTag} ${styledLevel}`, styleTag, styleLevel, message);
  }
}

export const logger = {
  info: (msg: any, module?: string) => log(msg, { level: 'info', module }),
  warn: (msg: any, module?: string) => log(msg, { level: 'warn', module }),
  error: (msg: any, module?: string) => log(msg, { level: 'error', module }),
  debug: (msg: any, module?: string) =>
    log(msg, { level: 'debug', module, devOnly: true }),
};
