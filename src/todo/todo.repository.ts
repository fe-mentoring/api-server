import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  NotFoundTodoException,
  UnauthorizedUpdateTodoException,
} from './todo.exception';

@Injectable()
export class TodoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(params: { userId: number }) {
    return this.prismaService.todo.findMany({
      where: { userId: params.userId },
    });
  }

  create(params: { userId: number; title: string }) {
    return this.prismaService.todo.create({
      data: params,
    });
  }

  async update(params: {
    userId: number;
    id: number;
    title?: string;
    completed?: boolean;
  }) {
    const { id, title, completed } = params;

    const todo = await this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundTodoException();
    }

    if (todo.userId !== params.userId) {
      throw new UnauthorizedUpdateTodoException();
    }

    const updatedTodo = await this.prismaService.todo.update({
      where: { id },
      data: { title, completed },
    });

    return {
      id: updatedTodo.id,
    };
  }

  async delete(params: { userId: number; id: number }) {
    return this.prismaService.todo.delete({
      where: { id: params.id },
    });
  }
}
