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
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.model';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllArtists(): Artist[] {
    return this.artistService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getArtistById(@Param('id', ParseUUIDPipe) id: string): Artist {
    const artist = this.artistService.getDataById(id);
    if (artist) return artist;
    else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  createArtist(@Body() createDto: CreateArtistDto): Artist {
    return this.artistService.create(createDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateArtistDto,
  ): Artist {
    const artist = this.artistService.getDataById(id);
    if (artist) {
      return this.artistService.update(updateDto, id);
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistById(@Param('id', ParseUUIDPipe) id: string): void {
    const artist = this.artistService.delete(id);
    if (artist) {
      return;
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
