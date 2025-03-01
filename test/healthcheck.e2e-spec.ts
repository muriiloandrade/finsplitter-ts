import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import type { App } from 'supertest/types';

import { HealthCheckModule } from '@interface/modules';

describe('HealthCheck (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health/liveness (GET)', () => {
    return supertest(app.getHttpServer()).get('/health/liveness').expect(200);
  });

  it('/health/readiness (GET)', () => {
    return supertest(app.getHttpServer()).get('/health/readiness').expect(200);
  });
});
