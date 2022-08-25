import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { Movie } from '../models/movie.class';
import { MovieService } from '../services/movie.service';
import { CreateMovieSwagger } from '../swagger/create-movie.swagger';
import { IndexMovieSwagger } from '../swagger/index-movie.swagger';
import { ShowMovieSwagger } from '../swagger/show-movie.swagger';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Cria um novo filme.' })
  @ApiResponse({
    status: 201,
    description: 'Filme criado com sucesso.',
    type: CreateMovieSwagger,
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
  create(@Body() movie: Movie): Observable<Movie> {
    return this.movieService.createMovie(movie);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({ summary: 'Lista todos os filmes.' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso.',
    type: IndexMovieSwagger,
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
  async findAll(): Promise<Observable<Movie[]>> {
    return this.movieService.findAllMovies();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Busca um filme específico pelo parâmetro "id".' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso.',
    type: ShowMovieSwagger,
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
  findById(@Param('id') id: number): Observable<Movie> {
    return this.movieService.findMovieById(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Edita um filme existente.' })
  @ApiResponse({
    status: 200,
    description: 'Filme editado com sucesso.',
    type: GenericUpdateSwagger,
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
    @Body() movie: Movie,
  ): Observable<UpdateResult> {
    return this.movieService.updateMovie(id, movie);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um filme existente.' })
  @ApiResponse({
    status: 200,
    description: 'Filme deletado com sucesso.',
    type: GenericDeleteSwagger,
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
    return this.movieService.deleteMovie(id);
  }
}
