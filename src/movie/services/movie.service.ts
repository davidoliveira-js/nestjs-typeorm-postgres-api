import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { MoviesEntity } from '../models/movie.entity';
import { Movie } from '../models/movie.class';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly movieRepository: Repository<MoviesEntity>,
  ) {}

  createMovie(movie: Movie): Observable<Movie> {
    return from(this.movieRepository.save(movie));
  }

  findAllMovies(): Observable<Movie[]> {
    return from(this.movieRepository.find());
  }

  findMovieById(id: number): Observable<Movie> {
    return from(this.movieRepository.findOneBy({ id: id }));
  }

  updateMovie(id: number, movie: Movie): Observable<UpdateResult> {
    return from(this.movieRepository.update(id, movie));
  }

  deleteMovie(id: number): Observable<DeleteResult> {
    return from(this.movieRepository.delete(id));
  }
}
