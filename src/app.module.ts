import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerMiddleware } from './modules/logger/logger.middleware';
import { HttpExceptionFilter } from './modules/filters/exeption.filter';

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
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
