import { Injectable } from '@nestjs/common';
import { Track } from 'src/modules/tracks/track.model';
import { DataService } from 'src/shared/data.service';

@Injectable()
export class ApiTrackService extends DataService {
  data: Track[] = [];

  clearArtistId(artistId: string): void {
    const index = this.data.findIndex((track) => track.artistId === artistId);
    if (index !== -1) {
      this.data[index].artistId = null;
    }
  }

  clearAlbumId(albumId: string): void {
    const index = this.data.findIndex((track) => track.albumId === albumId);
    if (index !== -1) {
      this.data[index].albumId = null;
    }
  }
}
