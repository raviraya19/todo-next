import { Injectable, Logger, Module } from '@nestjs/common'

@Injectable()
export class CustomLoggerService {
  getLogger(context: string) {
    const logger = new Logger(context)
    return {
      error: this.error(logger),
    }
  }

  error = (logger: Logger) => (operation: string, message: string, error?: Error) => {
    return logger.error(`${operation.toUpperCase()} --> ${message}`, error)
  }
}

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
