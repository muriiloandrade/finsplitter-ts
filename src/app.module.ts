import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { EnvModule } from '@infra/config';
import { HealthCheckModule } from '@interface/modules';

const declaredModules = [HealthCheckModule, EnvModule];

@Module({
  imports: [
    ...declaredModules,
    RouterModule.register([
      {
        path: '',
        children: [HealthCheckModule],
      },
    ]),
  ],
})
export class AppModule {}
