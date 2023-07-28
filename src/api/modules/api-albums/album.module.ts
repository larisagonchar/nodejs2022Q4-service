import { Module } from '@nestjs/common';
import { ApiAlbumService } from './album.service';

@Module({
  providers: [ApiAlbumService],
  exports: [ApiAlbumService],
})
export class ApiAlbumModule {}
