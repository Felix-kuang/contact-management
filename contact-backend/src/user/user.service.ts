import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto, UpdateUserDto } from '@app/user/dto/user.dto';
import { AuthService } from '@app/auth/auth.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async getUser(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        name: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }
    return user;
  }

  async changePassword(username: string, dto: UpdatePasswordDto) {
    const user: User | null = await this.authService.validateUser(
      username,
      dto.password,
    );
    if (!user) {
      throw new BadRequestException(`Incorrect current password`);
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    return this.prisma.user.update({
      where: { username },
      data: {
        password: hashedPassword,
      },
      select: {
        username: true,
        name: true,
      },
    });
  }

  async updateUser(username: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { username },
      data: {
        name: dto.name,
      },
      select: {
        username: true,
        name: true,
      },
    });
  }
}
