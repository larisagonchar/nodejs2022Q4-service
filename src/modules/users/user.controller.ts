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
} from '@nestjs/common';
import { ErrorMessage } from 'src/constants/error-message.constant';
import { validate } from 'uuid';
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
  getUserById(@Param('id') id: string): User {
    const isValidId = validate(id);
    if (isValidId) {
      const user = this.userService.getDataById(id);
      if (user) {
        delete user.password;
        return user;
      } else
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
    }
    throw new HttpException(
      `${id} ${ErrorMessage.ID_NOT_VALID}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post()
  @Header('Content-Type', 'application/json')
  createUser(@Body() createDto: CreateUserDto): User {
    if (createDto?.login && createDto?.password) {
      return this.userService.create(createDto);
    } else {
      throw new HttpException(
        ErrorMessage.NOT_ALL_FIELDS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  updateUserById(
    @Param('id') id: string,
    @Body() updateDto: UpdatePasswordDto,
  ): User {
    const isValidId = validate(id);
    if (isValidId) {
      if (updateDto?.newPassword && updateDto?.oldPassword) {
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
          throw new HttpException(
            ErrorMessage.ID_NOT_EXIST,
            HttpStatus.NOT_FOUND,
          );
      } else {
        throw new HttpException(
          ErrorMessage.NOT_ALL_FIELDS,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    throw new HttpException(
      `${id} ${ErrorMessage.ID_NOT_VALID}`,
      HttpStatus.BAD_REQUEST,
    );
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUserById(@Param('id') id: string): void {
    const isValidId = validate(id);
    if (isValidId) {
      const user = this.userService.delete(id);
      if (user) return;
      else
        throw new HttpException(
          ErrorMessage.ID_NOT_EXIST,
          HttpStatus.NOT_FOUND,
        );
    } else
      throw new HttpException(
        `${id} ${ErrorMessage.ID_NOT_VALID}`,
        HttpStatus.BAD_REQUEST,
      );
  }
}
