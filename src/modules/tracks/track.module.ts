import { TrackService } from 'src/modules/tracks/track.service';
import { TrackController } from 'src/modules/tracks/track.controller';
import { Module } from '@nestjs/common';
import { ApiTrackModule } from 'src/api/modules/api-tracks/track.module';
import { ApiFavoriteModule } from 'src/api/modules/api-favorites/favorite.module';

@Module({
  imports: [ApiTrackModule, ApiFavoriteModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
