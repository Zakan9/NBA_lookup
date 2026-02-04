import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getPlayers() {
    return this.playersService.getPlayers();
  }

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Delete('/:id')
  async deletePlayer(@Param('id') id: string) {
    await this.playersService.deletePlayer(id);
  }

  @Patch('/:id')
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('id') id: string,
  ) {
    const updatedPlayer = await this.playersService.updatePlayer(
      updatePlayerDto,
      id,
    );
    if (!updatedPlayer) {
      throw new NotFoundException('Player not found');
    }
    return updatedPlayer;
  }
}
