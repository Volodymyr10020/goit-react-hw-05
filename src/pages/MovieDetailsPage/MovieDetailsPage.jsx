import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state || "/movies");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { title, overview, genres } = movie;

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      <h1>{title}</h1>
      <p>{overview}</p>
      <h3>Genres:</h3>
      <ul>
        {genres && genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
      </ul>
      <hr />
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
