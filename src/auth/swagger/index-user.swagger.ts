/* eslint-disable prettier/prettier */
import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../models/user.entity';

export class IndexUserSwagger extends OmitType(UserEntity, ['password'] ) {}
