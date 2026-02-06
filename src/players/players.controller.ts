import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/database')
  async getPlayersFromDatabase(@Query() paginationDto: PaginationDto) {
    return this.playersService.getPlayersFromDatabase(paginationDto);
  }

  @Get('/api')
  async getPlayersFromApi() {
    return this.playersService.getPlayersFromApi();
  }

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Delete('/:id')
  async deletePlayer(@Param('id') id: string) {
    await this.playersService.deletePlayer(id);
  }

  @Delete()
  async deleteAllPlayers() {
    await this.playersService.deleteAllPlayers();
  }

  @Patch('/:id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    const updatedPlayer = await this.playersService.updatePlayer(
      id,
      updatePlayerDto,
    );
    if (!updatedPlayer) {
      throw new NotFoundException('Player not found');
    }
    return updatedPlayer;
  }
}
