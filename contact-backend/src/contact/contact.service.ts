import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateContactDto,
  UpdateContactDto,
} from '@app/contact/dto/contact.dto';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(username: string, dto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        ...dto,
        username,
      },
    });
  }

  async findAll(username: string) {
    return this.prisma.contact.findMany({
      where: { username },
    });
  }

  async findById(username: string, id: number) {
    const contact = await this.prisma.contact.findFirst({
      where: {
        id,
        username: username,
      },
    });

    if (!contact) {
      throw new NotFoundException(`Could not find contact: ${id}`);
    }

    return contact;
  }

  async update(username: string, id: number, dto: UpdateContactDto) {
    return this.prisma.contact.updateMany({
      where: {
        id,
        username: username,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(username: string, id: number) {
    const result = await this.prisma.contact.deleteMany({
      where: {
        id,
        username, // again, dari JWT
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Contact not found or not yours');
    }

    return result;
  }
}
