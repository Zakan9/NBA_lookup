import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getPlayers() {
    return this.playersService.getPlayers();
  }

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }
}
