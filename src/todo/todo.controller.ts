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

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createTodoDto: { title: string }) {
    return this.todoService.create({
      userId: req.user.userId,
      title: createTodoDto.title,
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body()
    updateTodoDTO: {
      title?: string;
      completed?: boolean;
    },
  ) {
    return this.todoService.update({
      userId: req.user.userId,
      id: Number(id),
      ...updateTodoDTO,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.todoService.delete({
      userId: req.user.userId,
      id: Number(id),
    });
  }
}
