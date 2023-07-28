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
} from '@nestjs/common';
import { FavoriteService } from 'src/modules/favorites/favorite.service';
import { Favorite } from './favorite.model';
import { ErrorMessage } from 'src/constants/error-message.constant';
import { validate } from 'uuid';
import { ApiTrackService } from 'src/api/modules/api-tracks/track.service';
import { ApiAlbumService } from 'src/api/modules/api-albums/album.service';
import { ApiArtistService } from 'src/api/modules/api-artists/artist.service';
import { Album } from '../albums/album.model';
import { Track } from '../tracks/track.model';
import { Artist } from '../artists/artist.model';

@Controller('favs')
export class FavoriteController {
  constructor(
    private favoriteService: FavoriteService,
    private apiTrackService: ApiTrackService,
    private apiAlbumService: ApiAlbumService,
    private apiArtistService: ApiArtistService,
  ) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllData(): Favorite {
    return this.favoriteService.getAllData();
  }

  @Post('track/:id')
  @Header('Content-Type', 'application/json')
  addTrack(@Param('id') id: string): void {
    if (validate(id)) {
      const track = this.apiTrackService.getById<Track>(id);
      if (track) {
        this.favoriteService.addTrack(track);
        return;
      } else {
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else {
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string): void {
    if (validate(id)) {
      const isTrackExist = this.favoriteService
        .getAllData()
        .tracks.find((track) => track.id === id);
      if (isTrackExist) {
        this.favoriteService.deleteTrack(id);
        return;
      } else {
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('album/:id')
  @Header('Content-Type', 'application/json')
  addAlbum(@Param('id') id: string): void {
    if (validate(id)) {
      const album = this.apiAlbumService.getById<Album>(id);
      if (album) {
        this.favoriteService.addAlbum(album);
        return;
      } else {
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else {
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string): void {
    if (validate(id)) {
      const isAlbumExist = this.favoriteService
        .getAllData()
        .albums.find((album) => album.id === id);
      if (isAlbumExist) {
        this.favoriteService.deleteAlbum(id);
        return;
      } else {
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('artist/:id')
  @Header('Content-Type', 'application/json')
  addArtist(@Param('id') id: string): void {
    if (validate(id)) {
      const artist = this.apiArtistService.getById<Artist>(id);
      if (artist) {
        this.favoriteService.addArtist(artist);
        return;
      } else {
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else {
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string): void {
    if (validate(id)) {
      const isArtistExist = this.favoriteService
        .getAllData()
        .artists.find((artist) => artist.id === id);
      if (isArtistExist) {
        this.favoriteService.deleteArtist(id);
        return;
      } else {
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
