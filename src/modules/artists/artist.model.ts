import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class UpdateArtistDto extends CreateArtistDto {}
