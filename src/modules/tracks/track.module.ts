import { TrackService } from 'src/modules/tracks/track.service';
import { TrackController } from 'src/modules/tracks/track.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
