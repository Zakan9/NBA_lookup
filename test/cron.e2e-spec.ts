import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { PlayersService } from '../src/players/players.service';
import { Player, PlayerSchema } from '../src/players/schemas/players.schema';

jest.mock('axios');

describe('Players Cron Job', () => {
  let mongoServer: MongoMemoryServer;
  let playersService: PlayersService;
  let playerModel: Model<Player>;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoServer.getUri()),
        MongooseModule.forFeature([
          { name: Player.name, schema: PlayerSchema },
        ]),
      ],
      providers: [
        PlayersService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              switch (key) {
                case 'API_KEY':
                  return 'test-api-key';
                case 'BASE_URL':
                  return 'https://api.balldontlie.io/v1';
                default:
                  throw new Error(`Missing a key`);
              }
            }),
          },
        },
      ],
    }).compile();

    playersService = moduleFixture.get(PlayersService);
    playerModel = moduleFixture.get<Model<Player>>(getModelToken(Player.name));
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it('should fetch all players across multiple pages', async () => {
    const mockPlayersPage1 = [
      {
        id: 123,
        firstName: 'Nojus',
        lastName: 'Savukynas',
        position: 'G-F',
        height: '6-0',
        weight: '180',
        jerseyNumber: '21',
        college: 'Alytus',
        country: 'LT',
        draftYear: 2024,
        draftRound: 1,
        draftNumber: 1,
      },
    ];

    const mockPlayersPage2 = [
      {
        id: 456,
        firstName: 'Giannis',
        lastName: 'Antetokounmpo',
        position: 'F',
        height: '6-11',
        weight: '243',
        jerseyNumber: '34',
        college: 'Athens',
        country: 'Greece',
        draftYear: 2013,
        draftRound: 1,
        draftNumber: 15,
      },
    ];

    const mockPlayersPage3 = [
      {
        id: 789,
        firstName: 'Stephen',
        lastName: 'Curry',
        position: 'G',
        height: '6-2',
        weight: '185',
        jerseyNumber: '30',
        college: 'Davidson',
        country: 'USA',
        draftYear: 2009,
        draftRound: 1,
        draftNumber: 7,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

    mockAxiosGet.mockResolvedValueOnce({
      data: {
        data: mockPlayersPage1,
        meta: { nextCursor: 2 },
      },
    } as Partial<AxiosResponse>);

    mockAxiosGet.mockResolvedValueOnce({
      data: {
        data: mockPlayersPage2,
        meta: { nextCursor: 3 },
      },
    } as Partial<AxiosResponse>);

    mockAxiosGet.mockResolvedValueOnce({
      data: {
        data: mockPlayersPage3,
        meta: { nextCursor: null },
      },
    } as Partial<AxiosResponse>);

    await playersService.upsertPlayersToDatabase();

    expect(mockAxiosGet).toHaveBeenCalledTimes(3);

    const calls = mockAxiosGet.mock.calls;

    expect(calls[0][0]).toContain('/players?per_page=100');
    expect(calls[0][0]).not.toContain('cursor');
    expect(calls[0][1]).toHaveProperty('headers');
    expect(calls[0][1]?.headers).toHaveProperty(
      'Authorization',
      'test-api-key',
    );

    expect(calls[1][0]).toContain('/players?per_page=100&cursor=2');
    expect(calls[1][1]).toHaveProperty('headers');

    expect(calls[2][0]).toContain('/players?per_page=100&cursor=3');
    expect(calls[2][1]).toHaveProperty('headers');

    const playersInDb = await playerModel.find().lean();
    expect(playersInDb).toHaveLength(3);

    const externalIds = playersInDb.map((p) => p.externalId).sort();
    expect(externalIds).toEqual([123, 456, 789]);
  });
});
