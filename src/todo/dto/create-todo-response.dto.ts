import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoResponseDto {
  @ApiProperty({ description: 'Todo ID' })
  id: number;
}
