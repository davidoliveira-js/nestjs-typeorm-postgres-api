import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controllers/movie.controller';
import { MoviesEntity } from './models/movie.entity';
import { MovieService } from './services/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MoviesEntity])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
