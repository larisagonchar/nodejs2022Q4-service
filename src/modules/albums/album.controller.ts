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
import { CreateAlbumDto, UpdateAlbumDto } from 'src/modules/albums/album.model';
import { AlbumService } from 'src/modules/albums/album.service';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllAlbums(): Promise<AlbumEntity[]> {
    return await this.albumService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getAlbumById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumEntity> {
    const album = await this.albumService.getDataById(id);
    if (album) return album;
    else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async createAlbum(@Body() createDto: CreateAlbumDto): Promise<AlbumEntity> {
    return await this.albumService.create(createDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async updateAlbumById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.albumService.getDataById(id);
    if (album) {
      return await this.albumService.update(updateDto, id);
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const album = await this.albumService.delete(id);
    if (album) {
      return;
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
