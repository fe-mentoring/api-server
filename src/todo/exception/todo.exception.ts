import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class NotFoundTodoException extends NotFoundException {
  constructor() {
    super({
      statusCode: 400,
      message: '존재하지 않는 todo입니다.',
    });
  }
}

export class UnauthorizedUpdateTodoException extends UnauthorizedException {
  constructor() {
    super({
      statusCode: 401,
      message: '본인의 todo만 수정할 수 있습니다.',
    });
  }
}

export class UnauthorizedDeleteTodoException extends UnauthorizedException {
  constructor() {
    super({
      statusCode: 403,
      message: '본인의 todo만 삭제할 수 있습니다.',
    });
  }
}
