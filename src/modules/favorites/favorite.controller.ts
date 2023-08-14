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
import { Favorite } from './favorite.model';
import { ErrorMessage } from 'src/constants/error-message.constant';
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
  addTrack(@Param('id', ParseUUIDPipe) id: string): void {
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
  }

  @Delete('track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string): void {
    const isTrackExist = this.favoriteService
      .getAllData()
      .tracks.find((track) => track.id === id);
    if (isTrackExist) {
      this.favoriteService.deleteTrack(id);
      return;
    } else {
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  @Header('Content-Type', 'application/json')
  addAlbum(@Param('id', ParseUUIDPipe) id: string): void {
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
  }

  @Delete('album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    const isAlbumExist = this.favoriteService
      .getAllData()
      .albums.find((album) => album.id === id);
    if (isAlbumExist) {
      this.favoriteService.deleteAlbum(id);
      return;
    } else {
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  @Header('Content-Type', 'application/json')
  addArtist(@Param('id', ParseUUIDPipe) id: string): void {
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
  }

  @Delete('artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string): void {
    const isArtistExist = this.favoriteService
      .getAllData()
      .artists.find((artist) => artist.id === id);
    if (isArtistExist) {
      this.favoriteService.deleteArtist(id);
      return;
    } else {
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
    }
  }
}
