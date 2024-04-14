import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: {
    email: string;
    username: string;
    password: string;
  }) {
    const user = await this.usersService.findOne(signUpDto.email);

    if (user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: '이미 존재하는 이메일입니다.',
      });
    }

    const { email, username, password } = signUpDto;

    return this.usersService.create({
      email: email,
      name: username,
      password: password,
    });
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: '이메일 또는 비밀번호가 일치하지 않습니다.',
      });
    }

    if (user.password !== password) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: '이메일 또는 비밀번호가 일치하지 않습니다.',
      });
    }
    const payload = { sub: user.id, username: user.name };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
