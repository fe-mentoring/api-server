import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
} from './exception/auth.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpRequestDto) {
    const user = await this.usersService.findOne(signUpDto.email);

    if (user) {
      throw new EmailAlreadyExistsException();
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

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UserNotFoundException();
    }

    const payload = { sub: user.id, username: user.name };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
