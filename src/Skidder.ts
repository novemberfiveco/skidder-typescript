import { SkidderLogLevel } from './Skidder.types';
import { SkidderLogBody, SkidderService } from './SkidderService';

type MetaDataKey = 'environment' | 'source';

export type LogMetaData = Record<string, string>;
export type LogData = Record<string, unknown>;

class Skidder {
  private logLevel = SkidderLogLevel.info;

  private metaData: LogMetaData = {};
  private globalData: LogData = {};

  private services: SkidderService[] = [];

  // Public
  // Setters & Getters
  setLogLevel(level: SkidderLogLevel) {
    this.logLevel = level;
  }

  setMetaDataRecord(key: MetaDataKey, value: string) {
    this.metaData[key] = value;
  }

  removeMetaDataRecord(key: MetaDataKey) {
    delete this.metaData[key];
  }

  setGlobalData(key: string, value?: unknown) {
    if (value) {
      this.globalData[key] = value;
    } else {
      delete this.globalData[key];
    }
  }

  addService(service: SkidderService) {
    if (!this.services.find(s => s.id === service.id)) {
      this.services.push(service);
    }
  }

  removeServiceWithId(serviceId: string) {
    this.services.filter(s => s.id !== serviceId);
  }

  adjustLevel(logLevel: SkidderLogLevel, serviceId: string) {
    this.services.forEach(service => {
      if (service.id === serviceId) {
        service.logLevel = logLevel;
      }
    });
  }

  // Logging
  logWithLevel(level: SkidderLogLevel, message: string, data?: LogData): void {
    if (level < this.logLevel) {
      return;
    }

    const logMessage = this.logBody(level, message, data);

    this.services.forEach(service => {
      if (level >= service.logLevel) {
        service.logMessageBody(logMessage, level);
      }
    });
  }

  // Private
  // Convenience
  private logBody(level: SkidderLogLevel, message: string, data?: LogData): SkidderLogBody {
    const timestamp = new Date().toISOString();

    const body: SkidderLogBody = {
      environment: this.metaData.environment ?? '',
      timestamp,
      message,
      level,
      data: data ?? {},
      global: this.globalData,
    };

    return body;
  }
}

const skidder = new Skidder();

export default skidder;

export function logTrace(message: string, data?: LogData): void {
  skidder.logWithLevel(SkidderLogLevel.trace, message, data);
}

export function logDebug(message: string, data?: LogData): void {
  skidder.logWithLevel(SkidderLogLevel.debug, message, data);
}

export function logInfo(message: string, data?: LogData): void {
  skidder.logWithLevel(SkidderLogLevel.info, message, data);
}

export function logWarn(message: string, data?: LogData): void {
  skidder.logWithLevel(SkidderLogLevel.warn, message, data);
}

export function logError(message: string, data?: LogData): void {
  skidder.logWithLevel(SkidderLogLevel.error, message, data);
}

export function logFatal(message: string, data?: LogData): void {
  skidder.logWithLevel(SkidderLogLevel.fatal, message, data);
}
