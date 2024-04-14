import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  NotFoundTodoException,
  UnauthorizedDeleteTodoException,
  UnauthorizedUpdateTodoException,
} from './exception/todo.exception';

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

    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundTodoException();
    }

    if (todo.userId !== params.userId) {
      throw new UnauthorizedUpdateTodoException();
    }

    const updatedTodo = await this.prisma.todo.update({
      where: { id },
      data: { title, completed },
    });

    return {
      id: updatedTodo.id,
    };
  }

  async delete(params: { userId: number; id: number }) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: params.id },
    });

    if (!todo) {
      throw new NotFoundTodoException();
    }

    if (todo.userId !== params.userId) {
      throw new UnauthorizedDeleteTodoException();
    }

    const deletedTodo = await this.prisma.todo.delete({
      where: { id: params.id },
    });

    return {
      id: deletedTodo.id,
    };
  }
}
