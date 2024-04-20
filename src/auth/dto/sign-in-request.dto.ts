import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignInRequestSchema = z.object({
  email: z
    .string({
      errorMap: () => ({ message: '이메일은 문자열 타입이어야 합니다.' }),
    })
    .min(1, '이메일은 필수 입력값입니다.')
    .describe('이메일'),
  password: z
    .string({
      errorMap: () => ({ message: '비밀번호는 문자열 타입이어야 합니다.' }),
    })
    .min(1, '비밀번호는 필수 입력값입니다.')
    .describe('비밀번호'),
});

export class SignInRequestDto extends createZodDto(SignInRequestSchema) {}
