import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateTodoSchema = z.object({
  title: z.string().min(1),
});

export class CreateTodoDto extends createZodDto(CreateTodoSchema) {}
