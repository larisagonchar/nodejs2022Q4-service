import { Album } from 'src/modules/albums/album.model';
import { Track } from 'src/modules/tracks/track.model';
import { Artist } from 'src/modules/artists/artist.model';

export interface Favorite {
  artists: Artist[]; // favorite artists ids
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}
