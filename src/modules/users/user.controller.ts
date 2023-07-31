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
import { CreateUserDto, UpdatePasswordDto, User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  getAllUsers(): User[] {
    return this.userService.getAllData();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  getUserById(@Param('id', ParseUUIDPipe) id: string): User {
    const user = this.userService.getDataById(id);
    if (user) {
      delete user.password;
      return user;
    } else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  createUser(@Body() createDto: CreateUserDto): User {
    return this.userService.create(createDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdatePasswordDto,
  ): User {
    const user = this.userService.getDataById(id);
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
  deleteUserById(@Param('id', ParseUUIDPipe) id: string): void {
    const user = this.userService.delete(id);
    if (user) return;
    else
      throw new HttpException(ErrorMessage.ID_NOT_EXIST, HttpStatus.NOT_FOUND);
  }
}
