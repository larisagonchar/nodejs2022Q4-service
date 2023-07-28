import { Injectable } from '@nestjs/common';
import { ApiFavoriteService } from 'src/api/modules/api-favorites/favorite.service';
import { Album } from 'src/modules/albums/album.model';
import { Artist } from 'src/modules/artists/artist.model';
import { Favorite } from 'src/modules/favorites/favorite.model';
import { Track } from 'src/modules/tracks/track.model';

@Injectable()
export class FavoriteService {
  constructor(private apiFavoriteService: ApiFavoriteService) {}

  getAllData(): Favorite {
    const favorites = this.apiFavoriteService.getAll();
    return favorites;
  }

  addTrack(track: Track): void {
    const favorites = this.apiFavoriteService.getAll();
    favorites.tracks.push(track);
  }

  deleteTrack(id: string): void {
    this.apiFavoriteService.deleteTrack(id);
  }

  addAlbum(album: Album): void {
    const favorites = this.apiFavoriteService.getAll();
    favorites.albums.push(album);
  }

  deleteAlbum(id: string): void {
    this.apiFavoriteService.deleteAlbum(id);
  }

  addArtist(artist: Artist): void {
    const favorites = this.apiFavoriteService.getAll();
    favorites.artists.push(artist);
  }

  deleteArtist(id: string): void {
    this.apiFavoriteService.deleteArtist(id);
  }
}
