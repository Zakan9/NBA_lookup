import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';

describe('Players Endpoints (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MongooseModule.forRoot(mongoUri)],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoServer.stop();
  });

  it('POST /players', () => {
    const playerInfo = {
      first_name: 'Nojus',
      last_name: 'Savukynas',
      position: ['G', 'F'],
      height: 177,
      weight: 65,
      jersey_number: '21',
      college: 'Alytus',
      country: 'LT',
      draft_year: 2024,
      draft_round: 1,
      draft_number: 1,
    };

    return request(app.getHttpServer())
      .post('/players')
      .send(playerInfo)
      .expect(201);
  });
});
