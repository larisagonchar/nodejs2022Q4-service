import { AlbumEntity } from 'src/modules/albums/entities/album.entity';
import { ArtistEntity } from 'src/modules/artists/entities/artist.entity';
import { FavoritesEntity } from 'src/modules/favorites/entities/favorites.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'varchar', nullable: true })
  albumId: string | null;

  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity | null;

  @OneToOne(() => FavoritesEntity, (favorite) => favorite.track)
  favorite: FavoritesEntity;
}
