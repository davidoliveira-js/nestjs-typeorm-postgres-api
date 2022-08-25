/* eslint-disable prettier/prettier */
import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../models/user.entity';

export class CreateUserSwagger extends OmitType(UserEntity, ['password']) {}
