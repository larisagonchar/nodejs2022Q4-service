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
} from '@nestjs/common';
import { ErrorMessage } from 'src/constants/error-message.constant';
import { Track } from 'src/modules/tracks/track.model';
import { TrackService } from 'src/modules/tracks/track.service';
import { validate } from 'uuid';

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
  getTrackById(@Param('id') id: string): Track {
    const isValidId = validate(id);
    if (isValidId) {
      const track = this.trackService.getDataById(id);
      if (track) return track;
      else
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
    } else
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
  }

  @Post()
  @Header('Content-Type', 'application/json')
  createTrack(@Body() createDto: Track): Track {
    if (
      createDto?.name &&
      (createDto?.artistId || createDto?.artistId === null) &&
      (createDto?.albumId || createDto?.albumId === null) &&
      createDto?.duration
    ) {
      if (
        typeof createDto.name === 'string' &&
        (typeof createDto.artistId === 'string' ||
          typeof createDto.artistId === 'object') &&
        (typeof createDto.albumId === 'string' ||
          typeof createDto.albumId === 'object') &&
        typeof createDto.duration === 'number'
      ) {
        return this.trackService.create(createDto);
      } else {
        throw new HttpException(
          ErrorMessage.INVALID_TYPE_OF_FIELDS,
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        ErrorMessage.NOT_ALL_FIELDS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateTrackById(@Param('id') id: string, @Body() updateDto: Track): Track {
    const isValidId = validate(id);
    if (isValidId) {
      if (Object.keys(updateDto).length !== 0) {
        if (
          typeof updateDto.name === 'string' &&
          (typeof updateDto.artistId === 'string' ||
            typeof updateDto.artistId === 'object') &&
          (typeof updateDto.albumId === 'string' ||
            typeof updateDto.albumId === 'object') &&
          typeof updateDto.duration === 'number'
        ) {
          const track = this.trackService.getDataById(id);
          if (track) {
            return this.trackService.update(updateDto, id);
          } else
            throw new HttpException(
              ErrorMessage.ID_NOT_EXIST,
              HttpStatus.NOT_FOUND,
            );
        } else {
          throw new HttpException(
            ErrorMessage.INVALID_TYPE_OF_FIELDS,
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        throw new HttpException(
          ErrorMessage.NOT_ALL_FIELDS,
          HttpStatus.BAD_REQUEST,
        );
      }
    } else
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackById(@Param('id') id: string): void {
    const isValidId = validate(id);
    if (isValidId) {
      const track = this.trackService.delete(id);
      if (track) {
        return;
      } else
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
    } else
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
  }
}
