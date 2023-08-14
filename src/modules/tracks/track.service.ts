import { Injectable } from '@nestjs/common';
import { ApiFavoriteService } from 'src/api/modules/api-favorites/favorite.service';
import { ApiTrackService } from 'src/api/modules/api-tracks/track.service';
import {
  CreateTrackDto,
  Track,
  UpdateTrackDto,
} from 'src/modules/tracks/track.model';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(
    private apiTrackService: ApiTrackService,
    private apiFavoriteService: ApiFavoriteService,
  ) {}

  getAllData(): Track[] {
    const tracks = this.apiTrackService.getAll();
    return JSON.parse(JSON.stringify(tracks));
  }

  getDataById(id: string): Track {
    return this.apiTrackService.getById(id);
  }

  create(body: CreateTrackDto): Track {
    const tracks = this.apiTrackService.getAll();

    const track: Track = {
      id: v4(),
      ...body,
    };

    tracks.push(track);

    return track;
  }

  update(body: UpdateTrackDto, id: string): Track {
    const tracks = this.apiTrackService.getAll<Track>();
    const index = tracks.findIndex((track) => track.id === id);
    tracks[index] = {
      ...tracks[index],
      ...body,
    };

    return tracks[index];
  }

  delete(id: string): Track {
    const tracks = this.apiTrackService.getAll<Track>();
    const track = this.getDataById(id);
    if (track) {
      const updatedTracks = tracks.filter((track) => track.id !== id);
      this.apiTrackService.updateAll(updatedTracks);
      this.apiFavoriteService.deleteTrack(id);
      return track;
    } else return null;
  }
}
