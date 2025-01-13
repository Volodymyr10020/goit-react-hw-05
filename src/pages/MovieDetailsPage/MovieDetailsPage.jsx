import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchMovieDetails } from "../../api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLocationRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(backLocationRef.current);
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { title, overview, genres, poster_path } = movie;

  return (
    <div className={styles.movieDetails}>
      <button onClick={handleGoBack}>Go back</button>
      <div className={styles.movieInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
        <div>
          <h1>{title}</h1>
          <p>{overview}</p>
          <p>Genres: {genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLocationRef.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLocationRef.current }}>
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MovieDetailsPage;
