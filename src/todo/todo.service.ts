import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(params: { userId: number }) {
    return this.prisma.todo.findMany({
      where: { userId: params.userId },
    });
  }

  create(params: { userId: number; title: string }) {
    return this.prisma.todo.create({
      data: params,
    });
  }

  update(params: {
    userId: number;
    id: number;
    title?: string;
    completed?: boolean;
  }) {
    const { id, title, completed } = params;

    // TODO: todo가 본인 것인지 확인해서 업데이트

    return this.prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
  }

  delete(params: { userId: number; id: number }) {
    // TODO: todo가 본인 것인지 확인해서 업데이트

    return this.prisma.todo.delete({ where: { id: params.id } });
  }
}
