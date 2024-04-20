import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const userNameRegex = new RegExp(/^(?=.*[a-z])(?=.*[0-9])[a-z0-9_]*$/);
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]*$/);

const SignUpRequestSchema = z.object({
  email: z
    .string({
      errorMap: () => ({ message: '이메일은 문자열 타입이어야 합니다.' }),
    })
    .email('이메일 형식이 올바르지 않습니다.')
    .describe('이메일'),
  username: z
    .string({
      errorMap: () => ({
        message: '유저 이름은 문자열 타입이어야 합니다. ',
      }),
    })
    .min(2, '유저 이름은 2자 이상이어야 합니다.')
    .max(10, '유저 이름은 10자 이하여야 합니다.')
    .regex(
      userNameRegex,
      '유저 이름은 영문 소문자와 숫자를 하나 이상 포함하며, 특수문자는 사용할 수 없습니다.',
    )
    .describe('유저 이름'),
  password: z
    .string({
      errorMap: () => ({ message: '비밀번호는 문자열 타입이어야 합니다.' }),
    })
    .min(6, '비밀번호는 6자 이상이어야 합니다.')
    .max(12, '비밀번호는 12자 이하여야 합니다.')
    .regex(
      passwordRegex,
      '비밀번호는 영문 소문자와 숫자를 하나 이상 포함해야 합니다.',
    )
    .describe('비밀번호'),
});

export class SignUpRequestDto extends createZodDto(SignUpRequestSchema) {}
