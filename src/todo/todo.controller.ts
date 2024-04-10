import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body() data: { title: string }) {
    return this.todoService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTodoDTO: {
      title?: string;
      completed?: boolean;
    },
  ) {
    return this.todoService.update({
      id: Number(id),
      ...updateTodoDTO,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(Number(id));
  }
}
