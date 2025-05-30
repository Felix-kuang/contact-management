// contact.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John', description: 'First name of the contact' })
  first_name!: string;

  @IsOptional()
  @ApiProperty({ example: 'Doe', required: false })
  last_name?: string;

  @IsOptional()
  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;

  @IsOptional()
  @ApiProperty({ example: '+6281234567890', required: false })
  phone?: string;
}

export class UpdateContactDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Mary', description: 'First name of the contact' })
  first_name?: string;

  @IsOptional()
  @ApiProperty({ example: 'Joe', required: false })
  last_name?: string;

  @IsOptional()
  @ApiProperty({ example: 'mary@example.com', required: false })
  email?: string;

  @IsOptional()
  @ApiProperty({ example: '+6281234567891', required: false })
  phone?: string;
}
