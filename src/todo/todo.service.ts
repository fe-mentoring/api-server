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

  async create(params: { userId: number; title: string }) {
    const todo = await this.prisma.todo.create({
      data: params,
    });

    return {
      id: todo.id,
    };
  }

  async update(params: {
    userId: number;
    id: number;
    title?: string;
    completed?: boolean;
  }) {
    const { id, title, completed } = params;

    // TODO: todo가 본인 것인지 확인해서 업데이트

    const updatedTodo = await this.prisma.todo.update({
      where: { id },
      data: { title, completed },
    });

    return {
      id: updatedTodo.id,
    };
  }

  async delete(params: { userId: number; id: number }) {
    // TODO: todo가 본인 것인지 확인해서 업데이트

    const deletedTodo = await this.prisma.todo.delete({
      where: { id: params.id },
    });

    return {
      id: deletedTodo.id,
    };
  }
}
