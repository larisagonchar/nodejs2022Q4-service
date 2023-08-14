import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  Header,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ErrorMessage } from 'src/constants/error-message.constant';
import { CreateTrackDto, UpdateTrackDto } from 'src/modules/tracks/track.model';
import { TrackService } from 'src/modules/tracks/track.service';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllTracks(): Promise<TrackEntity[]> {
    return await this.trackService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getTrackById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrackEntity> {
    const track = await this.trackService.getDataById(id);
    if (track) return track;
    else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async createTrack(@Body() createDto: CreateTrackDto): Promise<TrackEntity> {
    return await this.trackService.create(createDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async updateTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.trackService.getDataById(id);
    if (track) {
      return await this.trackService.update(updateDto, id);
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const track = await this.trackService.delete(id);
    if (track) {
      return;
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
