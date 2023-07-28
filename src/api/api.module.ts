import { Module } from '@nestjs/common';
import { ApiAlbumModule } from './modules/api-albums/album.module';
import { ApiArtistModule } from './modules/api-artists/artist.module';
import { ApiFavoriteModule } from './modules/api-favorites/favorite.module';
import { ApiTrackModule } from './modules/api-tracks/track.module';

@Module({
  imports: [ApiAlbumModule, ApiArtistModule, ApiFavoriteModule, ApiTrackModule],
  exports: [ApiAlbumModule, ApiArtistModule, ApiFavoriteModule, ApiTrackModule],
})
export class ApiModule {}
