import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  Header,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ErrorMessage } from 'src/constants/error-message.constant';
import { CreateArtistDto, UpdateArtistDto } from './artist.model';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllArtists(): Promise<ArtistEntity[]> {
    return await this.artistService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getArtistById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistEntity> {
    const artist = await this.artistService.getDataById(id);
    if (artist) return artist;
    else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async createArtist(
    @Body() createDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return await this.artistService.create(createDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async updateArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.artistService.getDataById(id);
    if (artist) {
      return await this.artistService.update(updateDto, id);
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    const artist = await this.artistService.delete(id);
    if (artist) {
      return;
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
