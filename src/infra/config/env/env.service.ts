import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get appEnv(): string {
    return this.configService.get<string>('app.env');
  }

  get logFormat(): string {
    return this.configService.get<string>('app.logFormat');
  }

  get port(): number {
    return this.configService.get<number>('app.port');
  }
}
