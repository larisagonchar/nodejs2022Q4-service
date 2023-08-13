import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAllData(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getDataById(id: string): Promise<ArtistEntity> {
    return await this.artistRepository.findOneBy({
      id,
    });
  }

  async create(artistDto: CreateArtistDto): Promise<ArtistEntity> {
    const createdArtist = this.artistRepository.create(artistDto);
    return await this.artistRepository.save(createdArtist);
  }

  async update(body: UpdateArtistDto, id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOneBy({
      id,
    });

    artist.grammy = body.grammy;
    artist.name = body.name;

    return await this.artistRepository.save(artist);
  }

  async delete(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOneBy({
      id,
    });

    if (artist) await this.artistRepository.remove(artist);
    return artist;
  }
}
