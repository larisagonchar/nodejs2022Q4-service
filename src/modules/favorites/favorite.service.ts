import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesEntity } from './entities/favorites.entity';
import { Repository } from 'typeorm';
import { TrackEntity } from '../tracks/entities/track.entity';
import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoriteRepository: Repository<FavoritesEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAllData() {
    const favorites: FavoritesEntity[] = await this.favoriteRepository.find();

    const result = favorites.reduce(
      (favs, acc) => {
        switch (acc.entityType) {
          case 'album':
            favs.albums.push(acc.album);
            break;
          case 'artist':
            favs.artists.push(acc.artist);
            break;
          case 'track':
            favs.tracks.push(acc.track);
            break;
        }

        return favs;
      },
      {
        artists: [],
        albums: [],
        tracks: [],
      },
    );

    return {
      artists: result.artists.filter((artist) => artist),
      albums: result.albums.filter((album) => album),
      tracks: result.tracks.filter((track) => track),
    };
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOneBy({
      id,
    });

    if (track) {
      const favorite = this.favoriteRepository.create({
        entityType: 'track',
        entityId: id,
      });
      return await this.favoriteRepository.save(favorite);
    } else return track;
  }

  async deleteTrack(id: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        entityId: id,
        entityType: 'track',
      },
    });

    if (favorite) {
      return await this.favoriteRepository.remove(favorite);
    } else return favorite;
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOneBy({
      id,
    });

    if (album) {
      const favorite = this.favoriteRepository.create({
        entityType: 'album',
        entityId: id,
      });
      return await this.favoriteRepository.save(favorite);
    } else return album;
  }

  async deleteAlbum(id: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        entityId: id,
        entityType: 'album',
      },
    });

    if (favorite) {
      return await this.favoriteRepository.remove(favorite);
    } else return favorite;
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOneBy({
      id,
    });

    if (artist) {
      const favorite = this.favoriteRepository.create({
        entityType: 'artist',
        entityId: id,
      });
      return await this.favoriteRepository.save(favorite);
    } else return artist;
  }

  async deleteArtist(id: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        entityId: id,
        entityType: 'artist',
      },
    });

    if (favorite) {
      return await this.favoriteRepository.remove(favorite);
    } else return favorite;
  }
}
