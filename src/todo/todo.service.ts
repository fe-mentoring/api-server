import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async findAll(params: { userId: number }) {
    const todos = await this.todoRepository.findAll({
      userId: params.userId,
    });

    return todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      user: {
        id: todo.userId,
      },
    }));
  }

  async create(params: { userId: number; title: string }) {
    const todo = await this.todoRepository.create(params);

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
    const updatedTodo = await this.todoRepository.update(params);

    return {
      id: updatedTodo.id,
    };
  }

  async delete(params: { userId: number; id: number }) {
    const deletedTodo = await this.todoRepository.delete(params);

    return {
      id: deletedTodo.id,
    };
  }
}
