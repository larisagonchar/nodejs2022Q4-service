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
import { validate } from 'uuid';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllArtists(): Artist[] {
    return this.artistService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getArtistById(@Param('id') id: string): Artist {
    const isValidId = validate(id);
    if (isValidId) {
      const artist = this.artistService.getDataById(id);
      if (artist) return artist;
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
  createArtist(@Body() createDto: Artist): Artist {
    if (createDto?.name && createDto?.grammy !== undefined) {
      return this.artistService.create(createDto);
    } else {
      throw new HttpException(
        ErrorMessage.NOT_ALL_FIELDS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateArtistById(@Param('id') id: string, @Body() updateDto: Artist): Artist {
    const isValidId = validate(id);
    if (isValidId) {
      if (updateDto?.name || updateDto?.grammy !== undefined) {
        if (
          typeof updateDto?.name === 'string' &&
          typeof updateDto?.grammy === 'boolean'
        ) {
          const artist = this.artistService.getDataById(id);
          if (artist) {
            return this.artistService.update(updateDto, id);
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
  deleteArtistById(@Param('id') id: string): void {
    const isValidId = validate(id);
    if (isValidId) {
      const artist = this.artistService.delete(id);
      if (artist) {
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
