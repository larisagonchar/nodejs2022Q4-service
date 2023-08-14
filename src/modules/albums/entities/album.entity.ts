import { ArtistEntity } from 'src/modules/artists/entities/artist.entity';
import { FavoritesEntity } from 'src/modules/favorites/entities/favorites.entity';
import { TrackEntity } from 'src/modules/tracks/entities/track.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @OneToMany(() => TrackEntity, (track) => track.albumId)
  tracks: TrackEntity[];

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity | null;

  @OneToOne(() => FavoritesEntity, (favorite) => favorite.album)
  favorite: FavoritesEntity;
}
