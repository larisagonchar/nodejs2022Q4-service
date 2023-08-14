import { Injectable } from '@nestjs/common';
import { Album } from 'src/modules/albums/album.model';
import { DataService } from '../../../shared/data.service';

@Injectable()
export class ApiAlbumService extends DataService {
  public data: Album[] = [];

  clearArtistId(artistId: string): void {
    const index = this.data.findIndex((album) => album.artistId === artistId);
    if (index !== -1) {
      this.data[index].artistId = null;
    }
  }
}
