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
import { AuthGuard } from 'src/auth/auth.guard';

import { TodoService } from './todo.service';
import { CreateTodoRequestDto } from './dto/create-todo-request.dto';
import { UpdateTodoRequestDto } from './dto/update-todo-request.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllTodoResponseDto } from './dto/find-all-todo-response.dto';
import { CreateTodoResponseDto } from './dto/create-todo-response.dto';
import { UpdateTodoResponseDto } from './dto/update-todo-response.dto';
import { DeleteTodoResponseDto } from './dto/delete-todo-response.dto';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  NotFoundTodoException,
  UnauthorizedDeleteTodoException,
  UnauthorizedUpdateTodoException,
} from './todo.exception';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Todo 조회 API' })
  @ApiTags('Todo')
  @ApiOkResponse({
    description: 'Todo 조회 성공',
    type: FindAllTodoResponseDto,
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req): Promise<FindAllTodoResponseDto[]> {
    return this.todoService.findAll({ userId: req.user.sub });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Todo 생성 API' })
  @ApiTags('Todo')
  @ApiCreatedResponse({
    description: 'Todo 생성 성공',
    type: CreateTodoResponseDto,
  })
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() createTodoDto: CreateTodoRequestDto,
  ): Promise<CreateTodoResponseDto> {
    return this.todoService.create({
      userId: req.user.sub,
      title: createTodoDto.title,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Todo 업데이트 API' })
  @ApiTags('Todo')
  @ApiOkResponse({
    description: 'Todo 업데이트 성공',
    type: UpdateTodoResponseDto,
  })
  @ApiException(() => [NotFoundTodoException, UnauthorizedUpdateTodoException])
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body()
    updateTodoDTO: UpdateTodoRequestDto,
  ): Promise<UpdateTodoResponseDto> {
    return this.todoService.update({
      userId: req.user.sub,
      id: Number(id),
      ...updateTodoDTO,
    });
  }

  @ApiBearerAuth()
  @ApiTags('Todo')
  @ApiOperation({ summary: 'Todo 삭제 API' })
  @ApiOkResponse({
    description: 'Todo 삭제 성공',
    type: DeleteTodoResponseDto,
  })
  @ApiException(() => [NotFoundTodoException, UnauthorizedDeleteTodoException])
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(
    @Request() req,
    @Param('id') id: string,
  ): Promise<DeleteTodoResponseDto> {
    return this.todoService.delete({
      userId: req.user.sub,
      id: Number(id),
    });
  }
}
