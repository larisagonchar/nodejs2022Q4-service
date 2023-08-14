import { Module } from '@nestjs/common';
import { AlbumModule } from './modules/albums/album.module';
import { ArtistModule } from './modules/artists/artist.module';
import { FavoriteModule } from './modules/favorites/favorite.module';
import { TrackModule } from './modules/tracks/track.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [AlbumModule, ArtistModule, FavoriteModule, TrackModule, UserModule],
})
export class AppModule {}
