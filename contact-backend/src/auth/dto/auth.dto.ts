import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  username!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name!: string;
}

export class LoginDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  username!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}

export class RefreshTokenDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refreshToken!: string;
}
