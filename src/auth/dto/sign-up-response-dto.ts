import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({ description: '유저 ID' })
  userId: number;

  @ApiProperty({ description: '유저 이름' })
  username: string;
}
