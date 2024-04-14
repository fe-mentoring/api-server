import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({ description: 'JWT 토큰' })
  accessToken: string;
}
