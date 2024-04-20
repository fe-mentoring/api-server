import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateTodoRequestSchema = z.object({
  title: z
    .string({
      errorMap: () => ({ message: '제목은 문자열 타입이어야 합니다.' }),
    })
    .min(1, '제목은 필수 입력값입니다.')
    .describe('할 일 제목'),
});

export class CreateTodoRequestDto extends createZodDto(
  CreateTodoRequestSchema,
) {}
