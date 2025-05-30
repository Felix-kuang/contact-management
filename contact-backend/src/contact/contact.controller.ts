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
import { ContactService } from '@app/contact/contact.service';
import { JwtAuthGuard } from '@app/auth/jwt.guard';
import { RequestWithUser } from '@app/auth/interface/request_with_user';
import {
  CreateContactDto,
  UpdateContactDto,
} from '@app/contact/dto/contact.dto';
import { successResponse } from '@app/util/response.util';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create contact' })
  @ApiResponse({ status: 201, description: 'Contact created successfully' })
  async create(@Req() req: RequestWithUser, @Body() dto: CreateContactDto) {
    return successResponse(
      await this.contactService.create(req.user.username, dto),
      'Contact created successfully',
      201,
    );
  }

  @Get(':contactId')
  @ApiOperation({ summary: 'Get contact by Id' })
  @ApiResponse({ status: 200, description: 'Returns contact by Id' })
  async get(
    @Req() req: RequestWithUser,
    @Param('contactId', ParseIntPipe) contactId: number,
  ) {
    const contact = await this.contactService.findById(
      req.user.username,
      contactId,
    );
    return successResponse(contact, 'Contact with id ' + contactId);
  }

  @Put(':contactId')
  @ApiOperation({ summary: 'Update Contact' })
  @ApiResponse({ status: 200, description: 'Update contact successfully' })
  async update(
    @Req() req: RequestWithUser,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() dto: UpdateContactDto,
  ) {
    return successResponse(
      await this.contactService.update(req.user.username, contactId, dto),
      'Contact with id ' + contactId + ' updated successfully',
    );
  }

  @Delete(':contactId')
  @ApiOperation({ summary: 'Removes Contact' })
  @ApiResponse({ status: 201, description: 'Contact removed successfully' })
  async remove(
    @Req() req: RequestWithUser,
    @Param('contactId', ParseIntPipe) contactId: number,
  ) {
    await this.contactService.remove(req.user.username, contactId);
    return successResponse(
      null,
      `Contact with id ${contactId} removed successfully`,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({ status: 201, description: 'returns all contacts' })
  async search(@Req() req: RequestWithUser) {
    return successResponse(
      await this.contactService.findAll(req.user.username),
      'contact for username: ' + req.user.username,
    );
  }
}
