import { UnauthorizedException } from '@nestjs/common';

export class EmailAlreadyExistsException extends UnauthorizedException {
  constructor() {
    super({
      statusCode: 401,
      message: '이미 존재하는 이메일입니다.',
    });
  }
}

export class UserNotFoundException extends UnauthorizedException {
  constructor() {
    super({
      statusCode: 401,
      message: '이메일 또는 비밀번호가 일치하지 않습니다.',
    });
  }
}
