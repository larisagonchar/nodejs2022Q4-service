import { Module } from '@nestjs/common';
import { ApiFavoriteService } from './favorite.service';

@Module({
  providers: [ApiFavoriteService],
  exports: [ApiFavoriteService],
})
export class ApiFavoriteModule {}
