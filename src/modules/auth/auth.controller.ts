import {
  Controller,
  Post,
  Body,
  Header,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAuthDto } from './auth.model';
import { ErrorMessage } from 'src/constants/error-message.constant';
import { SkipAuth } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('signup')
  @Header('Content-Type', 'application/json')
  async signup(@Body() createDto: CreateUserAuthDto) {
    return await this.authService.signup(createDto);
  }

  @SkipAuth()
  @Post('login')
  @Header('Content-Type', 'application/json')
  async login(@Body() loginDto: CreateUserAuthDto) {
    const token = await this.authService.login(loginDto);

    if (token) {
      return token;
    } else
      throw new HttpException(
        ErrorMessage.USER_NOT_EXIST,
        HttpStatus.FORBIDDEN,
      );
  }
}
