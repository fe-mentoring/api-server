import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoResponseDto {
  @ApiProperty({ description: 'Todo ID' })
  id: number;
}
