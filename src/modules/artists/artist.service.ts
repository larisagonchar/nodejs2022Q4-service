import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ApiTrackService } from 'src/api/modules/api-tracks/track.service';
import { ApiAlbumService } from 'src/api/modules/api-albums/album.service';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.model';
import { ApiArtistService } from 'src/api/modules/api-artists/artist.service';
import { ApiFavoriteService } from 'src/api/modules/api-favorites/favorite.service';

@Injectable()
export class ArtistService {
  constructor(
    private apiArtistService: ApiArtistService,
    private apiAlbumService: ApiAlbumService,
    private apiTrackService: ApiTrackService,
    private apiFavoriteService: ApiFavoriteService,
  ) {}

  getAllData(): Artist[] {
    const artists = this.apiArtistService.getAll();
    return JSON.parse(JSON.stringify(artists));
  }

  getDataById(id: string): Artist {
    return this.apiArtistService.getById(id);
  }

  create(body: CreateArtistDto): Artist {
    const artists = this.apiArtistService.getAll();
    const artist: Artist = {
      id: v4(),
      ...body,
    };

    artists.push(artist);

    return artist;
  }

  update(body: UpdateArtistDto, id: string): Artist {
    const artists = this.apiArtistService.getAll<Artist>();
    const index = artists.findIndex((artist) => artist.id === id);
    artists[index] = {
      ...artists[index],
      ...body,
    };

    return artists[index];
  }

  delete(id: string): Artist {
    const artists = this.apiArtistService.getAll<Artist>();
    const artist = this.getDataById(id);
    if (artist) {
      const updatedArtists = artists.filter((artist) => artist.id !== id);
      this.apiArtistService.updateAll(updatedArtists);
      this.apiAlbumService.clearArtistId(id);
      this.apiTrackService.clearArtistId(id);
      this.apiFavoriteService.deleteArtist(id);
      return artist;
    } else return null;
  }
}
