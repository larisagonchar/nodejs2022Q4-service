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
import {
  Album,
  CreateAlbumDto,
  UpdateAlbumDto,
} from 'src/modules/albums/album.model';
import { AlbumService } from 'src/modules/albums/album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllAlbums(): Album[] {
    return this.albumService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getAlbumById(@Param('id', ParseUUIDPipe) id: string): Album {
    const album = this.albumService.getDataById(id);
    if (album) return album;
    else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  createAlbum(@Body() createDto: CreateAlbumDto): Album {
    return this.albumService.create(createDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateAlbumById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateAlbumDto,
  ): Album {
    const album = this.albumService.getDataById(id);
    if (album) {
      return this.albumService.update(updateDto, id);
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumById(@Param('id', ParseUUIDPipe) id: string): void {
    const album = this.albumService.delete(id);
    if (album) {
      return;
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
