import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrackDto, UpdateTrackDto } from 'src/modules/tracks/track.model';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAllData(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async getDataById(id: string): Promise<TrackEntity> {
    return await this.trackRepository.findOneBy({
      id,
    });
  }

  async create(trackDto: CreateTrackDto): Promise<TrackEntity> {
    const createdTrack = this.trackRepository.create(trackDto);
    return await this.trackRepository.save(createdTrack);
  }

  async update(body: UpdateTrackDto, id: string): Promise<TrackEntity> {
    let track = await this.trackRepository.findOneBy({
      id,
    });

    track = {
      ...track,
      ...body,
    };

    return await this.trackRepository.save(track);
  }

  async delete(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOneBy({
      id,
    });

    if (track) await this.trackRepository.remove(track);
    return track;
  }
}
