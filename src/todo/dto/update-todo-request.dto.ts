import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UpdateTodoRequestSchema = z.object({
  title: z.string().optional(),
  completed: z.boolean().optional(),
});

export class UpdateTodoRequestDto extends createZodDto(
  UpdateTodoRequestSchema,
) {}
