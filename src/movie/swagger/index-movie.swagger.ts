/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/swagger";
import { MoviesEntity } from "../models/movie.entity";

export class IndexMovieSwagger extends OmitType(MoviesEntity, ['creadtedAt'] ) {}
