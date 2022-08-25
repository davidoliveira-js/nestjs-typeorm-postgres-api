/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Movie {
  id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description?: string;

  creadtedAt?: Date;
}
