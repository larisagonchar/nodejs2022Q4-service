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
import { CreateUserDto, UpdatePasswordDto } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllUsers() {
    return await this.userService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getDataById(id);
    if (user) {
      return user;
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async createUser(@Body() createDto: CreateUserDto) {
    return await this.userService.create(createDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.getFullDataById(id);
    if (user) {
      if (user.password === updateDto.oldPassword)
        return this.userService.update(updateDto, id);
      else
        throw new HttpException(
          `Old password isn't correct`,
          HttpStatus.FORBIDDEN,
        );
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.delete(id);
    if (user) return;
    else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
