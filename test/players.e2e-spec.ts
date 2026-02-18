import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { IPlayer } from 'src/players/interfaces/player.interface';

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
      team: {
        id: 21,
        conference: 'West',
        division: 'Northwest',
        city: 'Oklahoma City',
        name: 'Thunder',
        full_name: 'Oklahoma City Thunder',
        abbreviation: 'OKC',
      },
    };

    return request(app.getHttpServer())
      .post('/players')
      .send(playerInfo)
      .expect(201)
      .expect((res) => {
        const body = res.body as IPlayer;
        expect(body.first_name).toEqual('Nojus');
        expect(body.last_name).toEqual('Savukynas');
        expect(body.position).toEqual(['G', 'F']);
        expect(body.height).toEqual(177);
        expect(body.weight).toEqual(65);
        expect(body.jersey_number).toEqual('21');
        expect(body.college).toEqual('Alytus');
        expect(body.country).toEqual('LT');
        expect(body.draft_year).toEqual(2024);
        expect(body.draft_round).toEqual(1);
        expect(body.draft_number).toEqual(1);
      });
  });

  it('DELETE /players/:id', async () => {
    const playerInfo = {
      first_name: 'Kasparas',
      last_name: 'Jonaitis',
      position: ['F', 'C'],
      height: 210,
      weight: 130,
      jersey_number: '11',
      college: 'Kaunas Zalgiris',
      country: 'LT',
      draft_year: 2022,
      draft_round: 2,
      draft_number: 30,
      team: {
        id: 21,
        conference: 'West',
        division: 'Northwest',
        city: 'Oklahoma City',
        name: 'Thunder',
        full_name: 'Oklahoma City Thunder',
        abbreviation: 'OKC',
      },
    };

    const createResponse = await request(app.getHttpServer())
      .post('/players')
      .send(playerInfo)
      .expect(201);

    const createdPlayer = createResponse.body as IPlayer & { _id: string };
    expect(createdPlayer._id).toBeDefined();

    await request(app.getHttpServer())
      .delete(`/players/${createdPlayer._id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/players/${createdPlayer._id}`)
      .expect(404);
  });
});
