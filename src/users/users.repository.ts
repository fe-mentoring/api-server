import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = {
  userId: number;
  username: string;
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(email: string) {
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

  create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }
}
