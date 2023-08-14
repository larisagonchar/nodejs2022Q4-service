import { Injectable } from '@nestjs/common';
import { Favorite } from 'src/modules/favorites/favorite.model';

@Injectable()
export class ApiFavoriteService {
  private favorites: Favorite = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [], // favorite tracks ids
  };

  getAll(): Favorite {
    return this.favorites;
  }

  deleteTrack(id: string): void {
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track.id !== id,
    );
  }

  deleteAlbum(id: string): void {
    this.favorites.albums = this.favorites.albums.filter(
      (album) => album.id !== id,
    );
  }

  deleteArtist(id: string): void {
    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
