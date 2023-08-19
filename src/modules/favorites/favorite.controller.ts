import {
  Controller,
  Get,
  Delete,
  Header,
  Post,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoriteService } from 'src/modules/favorites/favorite.service';
import { ErrorMessage } from 'src/constants/error-message.constant';

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllData() {
    return await this.favoriteService.getAllData();
  }

  @Post('track/:id')
  @Header('Content-Type', 'application/json')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.favoriteService.addTrack(id);
    if (track) {
      return;
    } else {
      throw new HttpException(
        ErrorMessage.ID_NOT_EXIST,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.favoriteService.deleteTrack(id);
    if (track) {
      return;
    } else {
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  @Header('Content-Type', 'application/json')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.favoriteService.addAlbum(id);
    if (album) {
      return;
    } else {
      throw new HttpException(
        ErrorMessage.ID_NOT_EXIST,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.favoriteService.deleteAlbum(id);
    if (album) {
      this.favoriteService.deleteAlbum(id);
      return;
    } else {
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  @Header('Content-Type', 'application/json')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.favoriteService.addArtist(id);
    if (artist) {
      return;
    } else {
      throw new HttpException(
        ErrorMessage.ID_NOT_EXIST,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.favoriteService.deleteArtist(id);
    if (artist) {
      return;
    } else {
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
    }
  }
}
