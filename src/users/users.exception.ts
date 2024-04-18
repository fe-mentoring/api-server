import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      statusCode: 404,
      message: '존재하지 않는 사용자입니다.',
    });
  }
}
