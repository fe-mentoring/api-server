import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty({ description: '유저 ID', example: 1 })
  id: number;
}

export class FindAllTodoResponseDto {
  @ApiProperty({ description: 'Todo ID' })
  id: number;

  @ApiProperty({ description: 'Todo 제목', example: '열심히 살기' })
  title: string;

  @ApiProperty({ description: 'Todo 완료 여부' })
  completed: boolean;

  @ApiProperty({ description: '유저 ID' })
  user: User;
}
