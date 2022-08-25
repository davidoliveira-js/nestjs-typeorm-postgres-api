import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { GenericErrorSwagger } from 'src/helpers/swagger/generic-error.swagger';
import { User } from '../models/user.class';
import { AuthService } from '../services/auth.service';
import { CreateUserSwagger } from '../swagger/create-user.swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Cria um novo usuário.' })
  @ApiResponse({
    status: 201,
    description: 'Novo usuário criado.',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida.',
    type: GenericErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
    type: GenericErrorSwagger,
  })
  register(@Body() user: User): Observable<User> {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Realiza login e obtém o token necessário para consumo da API.',
  })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida.',
    type: GenericErrorSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Credenciais inválidas.',
    type: GenericErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno.',
    type: GenericErrorSwagger,
  })
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): Observable<{ token: string }> {
    return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}
