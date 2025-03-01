import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { EnvService } from '@infra/config';

describe('EnvService', () => {
  let envService: EnvService;
  let cfgService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EnvService,
        {
          provide: ConfigService,
          useFactory: () => ({
            get: jest.fn(),
          }),
        },
      ],
    }).compile();

    envService = moduleRef.get<EnvService>(EnvService);
    cfgService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('assures service is defined', () => {
    expect(envService).toBeDefined();
  });

  describe('call config service with the right key', () => {
    it('appEnv', () => {
      const cfgServiceSpy = jest
        .spyOn(cfgService, 'get')
        .mockReturnValue('mock');
      const appEnv = envService.appEnv;
      expect(cfgServiceSpy).toHaveBeenCalledWith('app.env');
    });

    it('logFormat', () => {
      const cfgServiceSpy = jest
        .spyOn(cfgService, 'get')
        .mockReturnValue('mock');
      const appEnv = envService.logFormat;
      expect(cfgServiceSpy).toHaveBeenCalledWith('app.logFormat');
    });

    it('port', () => {
      const cfgServiceSpy = jest
        .spyOn(cfgService, 'get')
        .mockReturnValue('mock');
      const appEnv = envService.port;
      expect(cfgServiceSpy).toHaveBeenCalledWith('app.port');
    });
  });
});
