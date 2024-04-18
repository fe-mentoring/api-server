import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description: 'JWT 토큰',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTcxMzQ0MTkyNCwiZXhwIjoxNzEzNTI4MzI0fQ.d5hmVznwl4_vtXUReyfbR5n9KZtKZl8Q0mLDDm-uFCo',
  })
  accessToken: string;
}
