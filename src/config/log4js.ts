import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../../log');

const log4jsConfig = {
  appenders: {
    access: {
      type: 'dateFile',
      filename: `${baseLogPath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true
    },
    error: {
      type: 'dateFile',
      filename: `${baseLogPath}/error/error.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true
    },
    warn: {
      type: 'dateFile',
      filename: `${baseLogPath}/warn/warn.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'DEBUG',
    },
    info: {
      appenders: ['access'],
      level: 'INFO'
    },
    warn: {
      appenders: ['warn'],
      level: 'WARN'
    },
    error: {
      appenders: ['error'],
      level: 'ERROR'
    }
  },
  pm2: true, // 使用 pm2 来管理项目时，打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};

export default log4jsConfig;