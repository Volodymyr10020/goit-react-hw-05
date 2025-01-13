import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch(() => setError("Failed to fetch movie details"));
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { title, overview, genres, poster_path } = movie;

  const goBack = () => {
    navigate(-1); // Returns to the previous page
  };

  return (
    <div>
      <button onClick={goBack} className={styles.button}>
        Go back
      </button>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className={styles.poster}
        />
        <div>
          <h1>{title}</h1>
          <p>{overview}</p>
          <h2>Genres</h2>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.links}>
        <Link to="cast" className={styles.link}>
          Cast
        </Link>
        <Link to="reviews" className={styles.link}>
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
