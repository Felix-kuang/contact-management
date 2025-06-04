import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name!: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(6)
  newPassword!: string;
}
