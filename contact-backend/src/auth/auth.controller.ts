import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';
import { RequestWithUser } from '@app/auth/interface/request_with_user';
import { successResponse } from '@app/util/response.util';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register endpoint' })
  @ApiResponse({ status: 201, description: 'Register new user' })
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(
      dto.username,
      dto.password,
      dto.name,
    );
    return successResponse(user, 'User registered successfully', 201);
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns access & refresh tokens',
  })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.login(dto.username, dto.password);
    return successResponse(user, 'Login success');
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Refreshes new access & refresh tokens',
  })
  async refresh(@Body() dto: RefreshTokenDto) {
    const newToken = await this.authService.refreshToken(dto.refreshToken);
    return successResponse(newToken, 'Token Refresh success');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  @Post('logout')
  async logout(@Req() req: RequestWithUser) {
    await this.authService.logout(req.user.username);
    return successResponse(null, 'User logged out successfully');
  }
}
