import { SkidderLogLevel } from './Skidder.types';
import { SkidderLogBody, SkidderService } from './SkidderService';

class SkidderServiceConsole extends SkidderService {
  logMessageBody(body: SkidderLogBody, logLevel: SkidderLogLevel): void {
    this.logMessage(this.logBody(body), logLevel);
  }

  // Private
  // Convenience
  private logMessage(message: string, logLevel: SkidderLogLevel): void {
    switch (logLevel) {
      case SkidderLogLevel.trace:
      case SkidderLogLevel.debug:
        console.log(message);
        break;
      case SkidderLogLevel.info:
        console.info(message);
        break;
      case SkidderLogLevel.warn:
        console.warn(message);
        break;
      case SkidderLogLevel.error:
      case SkidderLogLevel.fatal:
        console.error(message);
        break;
      default:
        break;
    }
  }

  private logBody(body: SkidderLogBody): string {
    const { environment, timestamp, message, data, global, level } = body;

    const logBody = {
      environment,
      timestamp,
      message,
      level: this.getLevelValue(level),
      data: { ...data, ...global },
    };

    let seen: unknown[] = [];
    const m = JSON.stringify(logBody, function(key, val) {
      if (val != null && typeof val === 'object') {
        if (seen.indexOf(val) >= 0) {
          return;
        }
        seen.push(val);
      }
      return val;
    });

    return m;
  }

  private getLevelValue(level: SkidderLogLevel): string {
    switch (level) {
      case SkidderLogLevel.trace:
        return 'TRACE';
      case SkidderLogLevel.debug:
        return 'DEBUG';
      case SkidderLogLevel.info:
        return 'INFO';
      case SkidderLogLevel.warn:
        return 'WARN';
      case SkidderLogLevel.error:
        return 'ERROR';
      case SkidderLogLevel.fatal:
        return 'FATAL';
      default:
        return '';
    }
  }
}

export default SkidderServiceConsole;
