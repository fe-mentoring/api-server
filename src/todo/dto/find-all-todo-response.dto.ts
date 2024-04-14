import { ApiProperty } from '@nestjs/swagger';

export class FindAllTodoResponseDto {
  @ApiProperty({ description: 'Todo ID' })
  id: number;

  @ApiProperty({ description: '유저 ID' })
  userId: number;

  @ApiProperty({ description: 'Todo 제목' })
  title: string;

  @ApiProperty({ description: 'Todo 완료 여부' })
  completed: boolean;

  @ApiProperty({ description: 'Todo 생성일' })
  createdAt: Date;

  @ApiProperty({ description: 'Todo 변경일' })
  updatedAt: Date;
}
