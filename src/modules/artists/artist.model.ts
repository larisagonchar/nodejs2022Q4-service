import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class UpdateArtistDto extends CreateArtistDto {}
