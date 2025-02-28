import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvService, envConfig, validationSchema } from '@infra/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      cache: true,
      validationSchema,
      envFilePath: ['.env'],
      isGlobal: true,
      validationOptions: {
        abortEarly: false,
        stack: false,
        convert: true,
      },
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
