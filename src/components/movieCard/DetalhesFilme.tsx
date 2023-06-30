import { useEffect, useState } from "react";
import "./DetalhesFilme.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Film } from "../../models/Film";
import "./DetalhesFilme.css"
import Navbar from "../navbar/Navbar";
import FundoHome from "../fundoHome/FundoHome";


export default function DetalhesFilme() {
  const { id } = useParams<{ id: string }>();
  const [filme, setFilme] = useState<Film>();

  useEffect(() => {
    const baseURL = `https://api.themoviedb.org/3/movie/${id}?api_key=c53174418b2a81eacf8a7966fa850c98&language=pt-BR`;
    axios.get<Film>(baseURL).then((response) => {
      setFilme(response.data);
      console.log(response.data);
      
    });
  }, [id]);

  if (!filme) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <FundoHome/>
      <div className="filme">
        <img
          src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
          alt={filme.title}
        />
        <div className="detalhes">
          <div className="titulo">
            <>
            <div className="title2">
              <h1>{filme.title}</h1>
              </div>
                <strong>Data de lançamento:</strong> {filme.release_date}
                <strong> Duração:</strong> {Math.floor(filme.runtime / 60)}h{" "}
                {filme.runtime % 60}min
                <div className="genres">
                    <strong>Generos: </strong>
                    {filme.genres.map((genre: any) => (
                      <div className="listaDeGeneros">
                          <strong key={genre.id}>{genre.name}</strong>
                        </div>
                    ))}
              </div>
            </>
          </div>
          <p>
            <p>
              <strong>Votação média:</strong> {filme.vote_average}
            </p>
            {filme.tagline}
          </p>
          <div className="sinopse">
            <p>Sinopse:</p>
            <p>{filme.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}
