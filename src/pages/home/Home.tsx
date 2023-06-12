import MovieCard from '../../components/movieCard/MovieCard';
import './Home.css'
import { Film } from '../../models/Film';
import { useNavigate } from "react-router-dom";

import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from 'react';
import { PopularFilms } from '../../App';
import axios from 'axios';
import CarouselHome from './CarouselHome';
import FundoHome from '../../components/fundoHome/FundoHome';
import Footer from '../../components/footer/Footer';

export function Home(): JSX.Element {
   const [page, setPage] = useState<number>(1);
  const [filmes, setFilmes] = useState<Film[]>([]);
   const [itemsPerPage, setItemsPerPage] = useState<number>(10);
   const baseURL = `https://api.themoviedb.org/3/movie/popular?api_key=c53174418b2a81eacf8a7966fa850c98&language=pt-BR&page=${page}`;

   useEffect(() => {
     axios.get<PopularFilms>(baseURL).then((response) => {
       setFilmes(response.data.results);
     });
   }, []);


   const handlePageChange = (event: any, newPage: number) => {
     setPage(newPage);
    };

    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, filmes.length);
    const currentPageItems = filmes.slice(start, end);
  return (
    <>
      <FundoHome />
      <CarouselHome />
      <p className="popular">
        <strong>Filmes Populares</strong>
      </p>
      <div id="listaFilmesPopulares">
        {currentPageItems.map((filme: Film, index: number) => (
              <MovieCard key={index} filmes={filme} />

        ))}
        <div className='movie-card' style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={page}
            count={Math.ceil(filmes.length / itemsPerPage)}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-page.Mui-selected": { color: "red" },
              "& .MuiPaginationItem-icon": { color: "red" },
              "& .MuiPaginationItem-root": {
                fontSize: "20px",
                color: "white",
                marginTop: "20px",
              },
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}