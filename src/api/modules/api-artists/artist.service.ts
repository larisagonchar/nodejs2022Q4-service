import { Injectable } from '@nestjs/common';
import { Artist } from 'src/modules/artists/artist.model';
import { DataService } from 'src/shared/data.service';

@Injectable()
export class ApiArtistService extends DataService {
  data: Artist[] = [];
}
