import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.todo.findMany();
  }

  create(data: { title: string }) {
    return this.prisma.todo.create({ data });
  }

  update(params: { id: number; title?: string; completed?: boolean }) {
    const { id, title, completed } = params;
    return this.prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
  }

  delete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
