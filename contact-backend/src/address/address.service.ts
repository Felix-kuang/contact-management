import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@app/prisma/prisma.service';
import {
  CreateAddressDto,
  UpdateAddressDto,
} from '@app/address/dto/address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(username: string, contactId: number, dto: CreateAddressDto) {
    const contact = await this.prisma.contact.findFirst({
      where: {
        id: contactId,
        username,
      },
    });

    if (!contact) {
      throw new NotFoundException(
        `Contact not found or does not belong to user`,
      );
    }

    return this.prisma.address.create({
      data: {
        ...dto,
        contact_id: contactId,
      },
    });
  }

  async findAll(contactId: number) {
    return this.prisma.address.findMany({
      where: { contact_id: contactId },
    });
  }

  async findById(contactId: number, addressId: number) {
    const address = await this.prisma.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new NotFoundException(`Address not found`);
    }

    return address;
  }

  async update(
    username: string,
    contactId: number,
    addressId: number,
    dto: UpdateAddressDto,
  ) {
    const contact = await this.prisma.contact.findFirst({
      where: { id: contactId, username },
    });
    if (!contact) throw new NotFoundException('Contact not found or not yours');

    return this.prisma.address.updateMany({
      where: {
        id: addressId,
        contact_id: contactId,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(contactId: number, addressId: number) {
    const result = await this.prisma.address.deleteMany({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Address not found');
    }

    return result;
  }
}
