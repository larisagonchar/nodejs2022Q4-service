import { Injectable } from '@nestjs/common';
import { Album } from 'src/modules/albums/album.model';
import { v4 } from 'uuid';
import { ApiAlbumService } from 'src/api/modules/api-albums/album.service';
import { ApiTrackService } from 'src/api/modules/api-tracks/track.service';
import { ApiFavoriteService } from 'src/api/modules/api-favorites/favorite.service';

@Injectable()
export class AlbumService {
  constructor(
    private apiAlbumService: ApiAlbumService,
    private apiTrackService: ApiTrackService,
    private apiFavoriteService: ApiFavoriteService,
  ) {}

  getAllData(): Album[] {
    const albums = this.apiAlbumService.getAll();
    return JSON.parse(JSON.stringify(albums));
  }

  getDataById(id: string): Album {
    return this.apiAlbumService.getById(id);
  }

  create(body: Album): Album {
    const albums = this.apiAlbumService.getAll();

    const album: Album = {
      id: v4(),
      ...body,
    };

    albums.push(album);

    return album;
  }

  update(body: Album, id: string): Album {
    const albums = this.apiAlbumService.getAll<Album>();
    const index = albums.findIndex((album) => album.id === id);
    albums[index] = {
      ...albums[index],
      ...body,
    };

    return albums[index];
  }

  delete(id: string): Album {
    const albums = this.apiAlbumService.getAll<Album>();
    const album = this.getDataById(id);
    if (album) {
      const updatedAlbums = albums.filter((album) => album.id !== id);
      this.apiAlbumService.updateAll(updatedAlbums);
      this.apiTrackService.clearAlbumId(id);
      this.apiFavoriteService.deleteAlbum(id);
      return album;
    } else return null;
  }
}
