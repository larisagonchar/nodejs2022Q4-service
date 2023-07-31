import { IsNotEmpty, IsString, IsNumber, ValidateIf } from 'class-validator';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @ValidateIf((obj) => obj.artistId)
  artistId: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}
