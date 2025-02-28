import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
} from '@nestjs/terminus';

@ApiExcludeController()
@Controller('health')
export class HealthCheckController {
  private readonly appName = 'finsplitter';

  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('liveness')
  @HealthCheck()
  async checkLiveness() {
    return this.healthCheckService.check([
      (): HealthIndicatorResult => ({
        [this.appName]: { status: 'up' },
      }),
    ]);
  }

  // This should have all the dependencies of the app
  @Get('readiness')
  @HealthCheck()
  async checkReadiness() {
    return this.healthCheckService.check([
      (): HealthIndicatorResult => ({
        [this.appName]: { status: 'up' },
      }),
    ]);
  }
}
