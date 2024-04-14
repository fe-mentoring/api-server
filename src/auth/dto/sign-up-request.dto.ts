import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const userNameRegex = new RegExp(/^(?=.*[a-z])(?=.*[0-9])[a-z0-9_]*$/);

const SignUpRequestSchema = z.object({
  email: z.string().email().describe('이메일'),
  username: z
    .string()
    .min(2)
    .max(10)
    .regex(userNameRegex)
    .describe('유저 이름'),
  password: z.string().min(6).max(12).describe('비밀번호'),
});

export class SignUpRequestDto extends createZodDto(SignUpRequestSchema) {}
