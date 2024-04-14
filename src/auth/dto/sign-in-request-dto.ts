import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SignInRequestSchema = z.object({
  email: z.string().min(1).describe('이메일'),
  password: z.string().min(1).describe('비밀번호'),
});

export class SignInRequestDto extends createZodDto(SignInRequestSchema) {}
