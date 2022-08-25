/* eslint-disable prettier/prettier */
import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../models/user.entity';

export class ShowUserSwagger extends OmitType(UserEntity, ['password']) {}
