import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string) {
    return this.prismaService.user.findFirst({
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
      where: {
        email,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prismaService.user.create({ data });
    return {
      userId: user.id,
      username: user.name,
    };
  }
}
