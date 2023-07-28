import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAllData(): User[] {
    const users: User[] = JSON.parse(JSON.stringify(this.users));
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  getDataById(id: string): User {
    const users: User[] = JSON.parse(JSON.stringify(this.users));
    return users.find((user) => user.id === id);
  }

  create(body: CreateUserDto): User {
    const user = {
      id: v4(),
      login: body.login,
      version: 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    } as User;

    this.users.push({
      ...user,
      password: body.password,
    });

    return user;
  }

  update(body: UpdatePasswordDto, id: string): User {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = {
      ...this.users[index],
      password: body.newPassword,
      version: ++this.users[index].version,
      updatedAt: +new Date(),
    };

    const updatedUser = JSON.parse(JSON.stringify(this.users[index]));
    if (updatedUser) delete updatedUser.password;
    return updatedUser;
  }

  delete(id: string): User {
    const user = this.getDataById(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
      return user;
    } else return null;
  }
}
