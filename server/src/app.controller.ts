import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, MemoryHealthIndicator, HealthCheck } from '@nestjs/terminus'

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator
  ) {}

  @Get('ping')
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ])
  }
}
