import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.todoService.findAll({ userId: req.user.userId });
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
