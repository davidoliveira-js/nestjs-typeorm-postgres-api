/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class MoviesEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ default: '' })
  @ApiProperty()
  category: string;

  @Column({ default: '' })
  @ApiProperty()
  title: string;

  @Column({ default: '' })
  @ApiProperty()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  creadtedAt: Date;
}
