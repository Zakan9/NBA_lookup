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
      firstName: 'Nojus',
      lastName: 'Savukynas',
      position: ['G', 'F'],
      height: 177,
      weight: 65,
      jerseyNumber: '21',
      college: 'Alytus',
      country: 'LT',
      draftYear: 2024,
      draftRound: 1,
      draftNumber: 1,
      team: {
        id: 21,
        conference: 'West',
        division: 'Northwest',
        city: 'Oklahoma City',
        name: 'Thunder',
        fullName: 'Oklahoma City Thunder',
        abbreviation: 'OKC',
      },
    };

    return request(app.getHttpServer())
      .post('/players')
      .send(playerInfo)
      .expect(201)
      .expect((res) => {
        const body = res.body as IPlayer;
        expect(body.firstName).toEqual('Nojus');
        expect(body.lastName).toEqual('Savukynas');
        expect(body.position).toEqual(['G', 'F']);
        expect(body.height).toEqual(177);
        expect(body.weight).toEqual(65);
        expect(body.jerseyNumber).toEqual('21');
        expect(body.college).toEqual('Alytus');
        expect(body.country).toEqual('LT');
        expect(body.draftYear).toEqual(2024);
        expect(body.draftRound).toEqual(1);
        expect(body.draftNumber).toEqual(1);
      });
  });

  it('DELETE /players/:id', async () => {
    const playerInfo = {
      firstName: 'Kasparas',
      lastName: 'Jonaitis',
      position: ['F', 'C'],
      height: 210,
      weight: 130,
      jerseyNumber: '11',
      college: 'Kaunas Zalgiris',
      country: 'LT',
      draftYear: 2022,
      draftRound: 2,
      draftNumber: 30,
      team: {
        id: 21,
        conference: 'West',
        division: 'Northwest',
        city: 'Oklahoma City',
        name: 'Thunder',
        fullName: 'Oklahoma City Thunder',
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
