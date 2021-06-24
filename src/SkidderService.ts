import { SkidderLogLevel } from './Skidder.types';

export interface SkidderLogBody {
  timestamp: string;
  level: SkidderLogLevel;
  message: string;
  data: {
    [key: string]: unknown;
  };
  global: {
    [key: string]: unknown;
  };
  environment: string;
}
export class SkidderService {
  id: string;
  logLevel: SkidderLogLevel;

  constructor(id: string, logLevel: SkidderLogLevel) {
    this.id = id;
    this.logLevel = logLevel;
  }

  logMessageBody(_body: SkidderLogBody, _logLevel: SkidderLogLevel): void {}
}
