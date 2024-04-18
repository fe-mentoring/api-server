import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty({ description: '유저 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '이메일', example: 'test1234@gmail.com' })
  name: string;
}

export class SignUpResponseDto {
  @ApiProperty({ description: '유저 정보', type: User })
  readonly user: User;
}
