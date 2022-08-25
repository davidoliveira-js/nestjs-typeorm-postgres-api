/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class GenericErrorSwagger {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  error: string;
  @ApiProperty()
  path: string;
  @ApiProperty()
  method: string;
  @ApiProperty()
  timeStamp: Date;
}