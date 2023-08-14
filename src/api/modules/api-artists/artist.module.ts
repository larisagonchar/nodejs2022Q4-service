import { Module } from '@nestjs/common';
import { ApiArtistService } from './artist.service';

@Module({
  providers: [ApiArtistService],
  exports: [ApiArtistService],
})
export class ApiArtistModule {}
