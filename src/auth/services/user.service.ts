/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, of } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.class';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findAlUsers(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  findUserById(id: number): Observable<User> {
    return from(this.userRepository.findOneBy({ id: id }));
  }

  updateUser(id: number, user: User): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }

  deleteUser(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }
}
