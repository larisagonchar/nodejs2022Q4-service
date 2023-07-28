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
import { Album } from 'src/modules/albums/album.model';
import { AlbumService } from 'src/modules/albums/album.service';
import { validate } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllAlbums(): Album[] {
    return this.albumService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getAlbumById(@Param('id') id: string): Album {
    const isValidId = validate(id);
    if (isValidId) {
      const album = this.albumService.getDataById(id);
      if (album) return album;
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
  createAlbum(@Body() createDto: Album): Album {
    if (
      createDto?.name &&
      createDto?.artistId !== undefined &&
      createDto?.year
    ) {
      return this.albumService.create(createDto);
    } else {
      throw new HttpException(
        ErrorMessage.NOT_ALL_FIELDS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateAlbumById(@Param('id') id: string, @Body() updateDto: Album): Album {
    const isValidId = validate(id);
    if (isValidId) {
      if (
        updateDto?.name ||
        updateDto?.artistId !== undefined ||
        updateDto?.year
      ) {
        if (
          typeof updateDto?.name === 'string' &&
          (typeof updateDto?.artistId === 'string' ||
            typeof updateDto?.artistId === 'object') &&
          typeof updateDto?.year === 'number'
        ) {
          const album = this.albumService.getDataById(id);
          if (album) {
            return this.albumService.update(updateDto, id);
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
  deleteAlbumById(@Param('id') id: string): void {
    const isValidId = validate(id);
    if (isValidId) {
      const album = this.albumService.delete(id);
      if (album) {
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
