import { Module } from '@nestjs/common';
import { AlbumController } from 'src/modules/albums/album.controller';
import { AlbumService } from 'src/modules/albums/album.service';
import { ApiAlbumModule } from 'src/api/modules/api-albums/album.module';
import { ApiTrackModule } from 'src/api/modules/api-tracks/track.module';
import { ApiFavoriteModule } from 'src/api/modules/api-favorites/favorite.module';

@Module({
  imports: [ApiAlbumModule, ApiTrackModule, ApiFavoriteModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
