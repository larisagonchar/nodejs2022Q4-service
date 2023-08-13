import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from 'src/modules/albums/album.model';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAllData(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getDataById(id: string): Promise<AlbumEntity> {
    return await this.albumRepository.findOneBy({
      id,
    });
  }

  async create(albumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const createdAlbum = this.albumRepository.create(albumDto);
    return await this.albumRepository.save(createdAlbum);
  }

  async update(body: UpdateAlbumDto, id: string): Promise<AlbumEntity> {
    let album = await this.albumRepository.findOneBy({
      id,
    });

    album = {
      ...album,
      ...body,
    };

    return await this.albumRepository.save(album);
  }

  async delete(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOneBy({
      id,
    });

    if (album) await this.albumRepository.remove(album);
    return album;
  }
}
