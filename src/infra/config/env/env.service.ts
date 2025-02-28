import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  appEnv(): string {
    return this.configService.get<string>('app.env');
  }

  logFormat(): string {
    return this.configService.get<string>('app.logFormat');
  }

  port(): number {
    return this.configService.get<number>('app.port');
  }
}
