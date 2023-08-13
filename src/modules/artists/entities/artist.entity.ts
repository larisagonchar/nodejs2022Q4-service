import { AlbumEntity } from 'src/modules/albums/entities/album.entity';
import { FavoritesEntity } from 'src/modules/favorites/entities/favorites.entity';
import { TrackEntity } from 'src/modules/tracks/entities/track.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity[];

  @OneToOne(() => FavoritesEntity, (favorite) => favorite.artist)
  favorite: FavoritesEntity;
}
