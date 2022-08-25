/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class GenericUpdateSwagger {
  @ApiProperty()
  generatedMaps: any[];
  @ApiProperty()
  raw: any[];
  @ApiProperty()
  affected: number;
}