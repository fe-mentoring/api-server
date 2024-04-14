import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UpdateTodoSchema = z.object({
  title: z.string().optional(),
  completed: z.boolean().optional(),
});

export class UpdateTodoDto extends createZodDto(UpdateTodoSchema) {}
