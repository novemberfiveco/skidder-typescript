# Skidder

Skidder will drag your logs to where they need to go. A small, uniform and extensible logging library, implemented across major technologies.

- iOS
- React
- React-Native
- Android

## Quick Start

```
npm install @novemberfiveco/skidder-typescript
```

## Usage

```
import skidder, { logInfo, SkidderLogLevel, SkidderServiceConsole } from '@novemberfiveco/skidder-typescript';

const consoleService = new SkidderServiceConsole(
    'console_1',
    __DEV__ ? SkidderLogLevel.trace : SkidderLogLevel.warn,
);
skidder.addService(consoleService);

skidder.setLogLevel(SkidderLogLevel.trace);

skidder.setMetaDataRecord('environment', config.ENVIRONMENT);
skidder.setGlobalData('tenant', config.BRAND_NAME);

logInfo("Info log")
```

## Extensible

Write your own logging service by confirming to `SkidderLogService` and add it as a service to Skidder.

## Roadmap

Build Skidder log services for the major app Crash and Analytics libraries. Further enhancing the crash reporting of your app, by providing a breadcrumb trail through your logs.

- [ ] Crashlytics
- [ ] Sentry
- [ ] Firebase
