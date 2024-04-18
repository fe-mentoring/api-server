import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersRepository } from './users.repository';

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(email: string) {
    return this.usersRepository.findOne(email);
  }

  async create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.create(data);

    const { password, ...result } = user;

    return result;
  }
}
