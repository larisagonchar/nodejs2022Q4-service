import { Injectable } from '@nestjs/common';
import { CreateUserAuthDto } from './auth.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(createDto: CreateUserAuthDto): Promise<void> {
    const salt = await genSalt(+process.env.CRYPT_SALT);
    const password = await hash(createDto.password, salt);

    const createdUser = this.authRepository.create({
      ...createDto,
      password,
    });

    await this.authRepository.save(createdUser);
  }

  async login(loginDto: CreateUserAuthDto): Promise<{
    accessToken: string;
  }> | null {
    const user = await this.authRepository.findOne({
      where: {
        login: loginDto.login,
      },
    });

    if (!user) return null;

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (isPasswordCorrect) {
      const payload = {
        userId: user.id,
        login: user.login,
      };

      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } else return null;
  }
}
