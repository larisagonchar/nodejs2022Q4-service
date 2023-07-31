import { IsNotEmpty, IsString, IsNumber, ValidateIf } from 'class-validator';

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ValidateIf((obj) => obj.artistId)
  artistId: string | null;

  @IsString()
  @ValidateIf((obj) => obj.albumId)
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto extends CreateTrackDto {}
