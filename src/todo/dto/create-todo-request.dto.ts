import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateTodoRequestSchema = z.object({
  title: z.string().min(1),
});

export class CreateTodoRequestDto extends createZodDto(
  CreateTodoRequestSchema,
) {}
