import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './user.model';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllData() {
    const users: UserEntity[] = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getDataById(id: string) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    return user ? user.toResponse() : user;
  }

  async getFullDataById(id: string) {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async create(userDto: CreateUserDto) {
    const createdUser = this.userRepository.create(userDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async update(body: UpdatePasswordDto, id: string) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    user.password = body.newPassword;
    return (await this.userRepository.save(user)).toResponse();
  }

  async delete(id: string) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (user) await this.userRepository.remove(user);
    return user;
  }
}
