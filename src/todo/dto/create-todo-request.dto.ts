import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateTodoRequestSchema = z.object({
  title: z.string().min(1).describe('할 일 제목'),
});

export class CreateTodoRequestDto extends createZodDto(
  CreateTodoRequestSchema,
) {}
