import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('fixedHashedPassword')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: {
    user: { findUnique: jest.Mock; create: jest.Mock; update: jest.Mock };
  };
  let jwtService: { sign: jest.Mock; verify: jest.Mock };

  const mockUser: User = {
    username: 'tester',
    password: 'fixedHashedPassword',
    name: 'Tester Name',
    token: null,
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mockJwtToken'),
      verify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a new user', async () => {
    prisma.user.create.mockResolvedValue(mockUser);

    const result = await authService.register(
      'tester',
      'admin#1234',
      'Tester Name',
    );

    expect(bcrypt.hash).toHaveBeenCalledWith('admin#1234', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: 'tester',
        password: 'fixedHashedPassword',
        name: 'Tester Name',
      },
      select: {
        name: true,
        username: true,
      },
    });

    expect(result).toEqual(mockUser);
  });

  it('should login with correct credentials', async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);
    prisma.user.update.mockResolvedValue({
      ...mockUser,
      token: 'mockRefreshToken',
    });
    jwtService.sign
      .mockReturnValueOnce('mockAccessToken')
      .mockReturnValueOnce('mockRefreshToken');

    const result = await authService.login('tester', 'admin#1234');
    expect(result).toEqual({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      expiresIn: 900,
    });
  });

  it('should throw error if login fails', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(authService.login('invalid', 'wrong')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should refresh token correctly', async () => {
    prisma.user.findUnique.mockResolvedValue({
      ...mockUser,
      token: 'mockRefreshToken',
    });
    jwtService.verify.mockReturnValueOnce(true);
    jwtService.sign
      .mockReturnValueOnce('mockAccessToken')
      .mockReturnValueOnce('newMockRefreshToken');
    prisma.user.update.mockResolvedValue({
      ...mockUser,
      token: 'newMockRefreshToken',
    });

    const result = await authService.refreshToken('tester', 'mockRefreshToken');

    expect(result).toEqual({
      accessToken: 'mockAccessToken',
      refreshToken: 'newMockRefreshToken',
      expiresIn: 900,
    });
  });

  it('should logout and clear token', async () => {
    prisma.user.update.mockResolvedValue({ ...mockUser, token: null });

    await authService.logout('tester');

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { username: 'tester' },
      data: { token: null },
    });
  });
});
