import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/jwt.guard';
import { UserService } from '@app/user/user.service';
import { RequestWithUser } from '@app/auth/interface/request_with_user';
import { successResponse } from '@app/util/response.util';
import { UpdateUserDto } from '@app/user/dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({ status: 200, description: 'Current user information' })
  async getCurrentUser(@Req() req: RequestWithUser) {
    const user = await this.userService.getUser(req.user.username);
    return successResponse(user, 'Current user fetched');
  }

  @Patch('current')
  @ApiOperation({ summary: 'Update current user information' })
  @ApiResponse({ status: 200, description: 'Update current user information' })
  async updateUser(@Req() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(
      req.user.username,
      dto,
    );

    return successResponse(updatedUser, 'User updated successfully');
  }
}
