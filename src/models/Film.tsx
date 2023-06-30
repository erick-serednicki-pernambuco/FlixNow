import { Genre } from "./Genre";

export interface Film {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  tagline: string;
}
