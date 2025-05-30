import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Jl. Utama', required: false })
  street?: string;

  @IsOptional()
  @ApiProperty({ example: 'Jakarta Barat', required: false })
  city?: string;

  @IsOptional()
  @ApiProperty({ example: 'DKI Jakarta', required: false })
  province?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Indonesia', required: true })
  country!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12345', required: true })
  postal_code!: string;

}

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Jl. Utama 2', required: false })
  street?: string;

  @IsOptional()
  @ApiProperty({ example: 'Jakarta Utara', required: false })
  city?: string;

  @IsOptional()
  @ApiProperty({ example: 'DKI Jakarta', required: false })
  province?: string;

  @IsString()
  @IsOptional() // optional on update
  @ApiProperty({ example: 'Indonesia', required: false })
  country?: string;

  @IsString()
  @IsOptional() // optional on update
  @ApiProperty({ example: '12355', required: false })
  postal_code?: string;

}
