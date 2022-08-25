/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class GenericDeleteSwagger {
  @ApiProperty()
  raw: any[];
  @ApiProperty()
  affected: number;
}