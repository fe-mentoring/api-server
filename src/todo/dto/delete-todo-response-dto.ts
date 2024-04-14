import { ApiProperty } from '@nestjs/swagger';

export class DeleteTodoResponseDto {
  @ApiProperty({ description: 'Todo ID' })
  id: number;
}
