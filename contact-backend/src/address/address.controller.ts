import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/jwt.guard';
import { AddressService } from '@app/address/address.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestWithUser } from '@app/auth/interface/request_with_user';
import {
  CreateAddressDto,
  UpdateAddressDto,
} from '@app/address/dto/address.dto';
import { successResponse } from '@app/util/response.util';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':contactId/addresses')
  @ApiOperation({ summary: 'Add a new address' })
  @ApiResponse({ status: 201, description: 'Add a new address' })
  @ApiResponse({
    status: 404,
    description: 'Contact not found or does not belong to user',
  })
  async create(
    @Req() req: RequestWithUser,
    @Body() dto: CreateAddressDto,
    @Param('contactId', ParseIntPipe) contactId: number,
  ) {
    return successResponse(
      await this.addressService.create(req.user.username, contactId, dto),
      'address added successfully.',
      201,
    );
  }

  @Get(':contactId/addresses/:addressId')
  @ApiOperation({ summary: 'Get address' })
  @ApiResponse({
    status: 200,
    description: 'Get an address by contact id and address id',
  })
  @ApiResponse({
    status: 400,
    description: 'Address not found',
  })
  async get(
    @Req() req: RequestWithUser,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ) {
    return successResponse(
      await this.addressService.findById(contactId, addressId),
      'contact for user: ' + contactId,
    );
  }

  @Put(':contactId/addresses/:addressId')
  @ApiOperation({ summary: 'Update address' })
  @ApiResponse({ status: 200, description: 'Updates an address' })
  @ApiResponse({
    status: 400,
    description: 'Contact not found or not yours',
  })
  async update(
    @Req() req: RequestWithUser,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return successResponse(
      await this.addressService.update(
        req.user.username,
        contactId,
        addressId,
        dto,
      ),
      'address updated successfully.',
    );
  }

  @Delete(':contactId/addresses/:addressId')
  @ApiOperation({ summary: 'Delete address' })
  @ApiResponse({ status: 200, description: 'Deletes an address' })
  @ApiResponse({
    status: 400,
    description: 'Address not found',
  })
  async remove(
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ) {
    return successResponse(
      await this.addressService.remove(contactId, addressId),
      'address removed successfully.',
    );
  }

  @Get(':contactId/addresses')
  @ApiOperation({ summary: 'List Address' })
  @ApiResponse({ status: 200, description: 'Returns all address of a contact' })
  async search(@Param('contactId', ParseIntPipe) contactId: number) {
    return successResponse(
      await this.addressService.findAll(contactId),
      'list of address for contact:' + contactId,
    );
  }
}
