/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GenericDeleteSwagger } from 'src/helpers/swagger/generic-delete.swagger';
import { GenericErrorSwagger } from 'src/helpers/swagger/generic-error.swagger';
import { GenericUpdateSwagger } from 'src/helpers/swagger/generic-update.swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../models/user.class';
import { UserService } from '../services/user.service';
import { IndexUserSwagger } from '../swagger/index-user.swagger';
import { ShowUserSwagger } from '../swagger/show-user.swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários.' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso.',
    type: IndexUserSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    type: GenericErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
    type: GenericErrorSwagger,
  })
  findAll(): Observable<User[]> {
    return this.userService.findAlUsers();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário específico pelo parâmetro "id".' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso.',
    type: ShowUserSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    type: GenericErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
    type: GenericErrorSwagger,
  })
  findById(@Param('id') id: number): Observable<User> {
    return this.userService.findUserById(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Edita um usuário existente.' })
  @ApiResponse({
    status: 200,
    description: 'Usuário editado com sucesso.',
    type: GenericUpdateSwagger
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    type: GenericErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
    type: GenericErrorSwagger,
  })
  update(
    @Param('id') id: number,
    @Body() user: User,
  ): Observable<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário existente.' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso.',
    type: GenericDeleteSwagger
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
    type: GenericErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
    type: GenericErrorSwagger,
  })
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
