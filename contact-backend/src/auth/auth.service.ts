import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.prisma.user.update({
      where: { username: user.username },
      data: { token: refreshToken },
    });

    return [accessToken, refreshToken];
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const [accessToken, refreshToken] = await this.generateToken(user);

    return { accessToken, refreshToken, expiresIn: 900 };
  }

  async refreshToken(username: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user || user.token !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    try {
      this.jwtService.verify(refreshToken);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown Error';
      throw new UnauthorizedException(`Refresh token error: ${errMsg}`);
    }

    const [accessToken, newRefreshToken] = await this.generateToken(user);

    return { accessToken, refreshToken: newRefreshToken, expiresIn: 900 };
  }

  async logout(username: string) {
    await this.prisma.user.update({
      where: { username },
      data: { token: null },
    });
  }
}
