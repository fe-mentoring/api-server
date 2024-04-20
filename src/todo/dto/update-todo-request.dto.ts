import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UpdateTodoRequestSchema = z.object({
  title: z
    .string({
      errorMap: () => ({ message: '제목은 문자열 타입이어야 합니다.' }),
    })
    .optional(),
  completed: z
    .boolean({
      errorMap: () => ({ message: '완료 여부는 불리언 타입이어야 합니다.' }),
    })
    .optional(),
});

export class UpdateTodoRequestDto extends createZodDto(
  UpdateTodoRequestSchema,
) {}
