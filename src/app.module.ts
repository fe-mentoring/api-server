import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [TodoModule, AuthModule, UsersModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
