import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
      select: {
        username: true,
        name: true,
      },
    });
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return user;
  }

  async generateToken(user: User): Promise<[string, string]> {
    const payload: JwtPayload = { username: user.username, sub: user.name };

    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.prisma.user.update({
      where: { username: user.username },
      data: { token: refresh_token },
    });

    return [access_token, refresh_token];
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const [access_token, refresh_token] = await this.generateToken(user);

    await this.prisma.user.update({
      where: { username: user.username },
      data: {
        token: refresh_token,
      },
    });

    return { access_token, refresh_token, expiresIn: 900 };
  }

  async refreshToken(refreshToken: string) {
    const user = await this.prisma.user.findFirst({
      where: { token: refreshToken },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    try {
      this.jwtService.verify(refreshToken);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown Error';
      throw new UnauthorizedException(`Refresh token error: ${errMsg}`);
    }

    const [access_token, newRefreshToken] = await this.generateToken(user);

    await this.prisma.user.update({
      where: { username: user.username },
      data: {
        token: newRefreshToken,
      },
    });

    return { access_token, refresh_token: newRefreshToken, expiresIn: 900 };
  }

  async logout(username: string) {
    await this.prisma.user.update({
      where: { username },
      data: { token: null },
    });
  }
}
