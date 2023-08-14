import { Module } from '@nestjs/common';
import { ApiTrackService } from './track.service';

@Module({
  providers: [ApiTrackService],
  exports: [ApiTrackService],
})
export class ApiTrackModule {}
