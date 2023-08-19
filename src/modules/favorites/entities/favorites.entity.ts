import { AlbumEntity } from 'src/modules/albums/entities/album.entity';
import { ArtistEntity } from 'src/modules/artists/entities/artist.entity';
import { TrackEntity } from 'src/modules/tracks/entities/track.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: null,
  })
  entityType: 'album' | 'artist' | 'track';

  @Column({
    type: 'varchar',
    default: null,
  })
  entityId: string;

  @OneToOne(() => ArtistEntity, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'entityId' })
  artist: ArtistEntity;

  @OneToOne(() => AlbumEntity, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'entityId' })
  album: AlbumEntity;

  @OneToOne(() => TrackEntity, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'entityId' })
  track: TrackEntity;
}
