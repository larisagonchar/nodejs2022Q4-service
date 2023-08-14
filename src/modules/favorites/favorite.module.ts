import { Module } from '@nestjs/common';
import { ApiModule } from 'src/api/api.module';
import { FavoriteController } from 'src/modules/favorites/favorite.controller';
import { FavoriteService } from 'src/modules/favorites/favorite.service';

@Module({
  imports: [ApiModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
