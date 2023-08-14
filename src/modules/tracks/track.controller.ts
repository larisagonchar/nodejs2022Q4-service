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
import {
  CreateTrackDto,
  Track,
  UpdateTrackDto,
} from 'src/modules/tracks/track.model';
import { TrackService } from 'src/modules/tracks/track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllTracks(): Track[] {
    return this.trackService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getTrackById(@Param('id', ParseUUIDPipe) id: string): Track {
    const track = this.trackService.getDataById(id);
    if (track) return track;
    else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  createTrack(@Body() createDto: CreateTrackDto): Track {
    return this.trackService.create(createDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateTrackDto,
  ): Track {
    const track = this.trackService.getDataById(id);
    if (track) {
      return this.trackService.update(updateDto, id);
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackById(@Param('id', ParseUUIDPipe) id: string): void {
    const track = this.trackService.delete(id);
    if (track) {
      return;
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
