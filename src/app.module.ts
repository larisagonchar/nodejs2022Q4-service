import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/entities/user.entity';
import { ArtistEntity } from './modules/artists/entities/artist.entity';
import { TrackEntity } from './modules/tracks/entities/track.entity';
import { AlbumEntity } from './modules/albums/entities/album.entity';
import { AlbumModule } from './modules/albums/album.module';
import { ArtistModule } from './modules/artists/artist.module';
import { TrackModule } from './modules/tracks/track.module';
import { FavoriteModule } from './modules/favorites/favorite.module';
import { FavoritesEntity } from './modules/favorites/entities/favorites.entity';
import { AuthModule } from './modules/auth/auth.module';
import { AuthEntity } from './modules/auth/entities/auth.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        UserEntity,
        TrackEntity,
        ArtistEntity,
        AlbumEntity,
        FavoritesEntity,
        AuthEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    AlbumModule,
    ArtistModule,
    FavoriteModule,
    TrackModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
