import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from '@app/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
