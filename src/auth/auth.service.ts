import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
} from './auth.exception';
import { SignInRequestDto } from './dto/sign-in-request.dto';

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

    const createdUser = await this.usersService.create({
      email: email,
      name: username,
      password: hashedPassword,
    });

    return {
      user: {
        id: createdUser.id,
        name: createdUser.name,
      },
    };
  }

  async signIn(signInDto: SignInRequestDto) {
    const { email, password } = signInDto;

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
