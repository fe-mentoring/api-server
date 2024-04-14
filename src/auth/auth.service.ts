import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignUpRequestDto } from './dto/sign-up-request-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpRequestDto) {
    const user = await this.usersService.findOne(signUpDto.email);

    if (user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: '이미 존재하는 이메일입니다.',
      });
    }

    const { email, username, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.usersService.create({
      email: email,
      name: username,
      password: hashedPassword,
    });
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(email);

    const notMatchMessage = '이메일 또는 비밀번호가 일치하지 않습니다.';

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: notMatchMessage,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: notMatchMessage,
      });
    }

    const payload = { sub: user.id, username: user.name };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
