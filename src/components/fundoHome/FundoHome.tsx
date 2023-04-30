import { useEffect } from "react";
import { Film } from "../../models/Film";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import React from "react";
import { PopularFilms } from "../../App";
import "./FundoHome.css";

export default function FundoHome() {
    const [filmes, setFilmes] = React.useState<Film[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = React.useState<number>(6);

    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, filmes.length);
    const currentPageItems = filmes.slice(start, end);

    const baseURL = `https://api.themoviedb.org/3/movie/popular?api_key=c53174418b2a81eacf8a7966fa850c98&language=pt-BR&page=${page}`;

    useEffect(() => {
      axios.get<PopularFilms>(baseURL).then((response) => {
        setFilmes(response.data.results);
      });
    }, []);

  return (
    <>
      <div className="fundo">
        <Carousel>
          {currentPageItems.map((filme: Film, index: number) => (
            <div key={index}>
              <img
                style={{ width: "100%", height: "105vw" }}
                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                alt={filme.title}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
