import "./MovieCard.css";

function MovieCard(props: any): JSX.Element {

const {filmes} = props;

  return (
    <>
    <div className="movie-card">
       {<img src={`https://image.tmdb.org/t/p/w500${filmes.poster_path}`} alt={filmes.poster_path} />}
    </div>
    </>    
  )

}

export default MovieCard;
