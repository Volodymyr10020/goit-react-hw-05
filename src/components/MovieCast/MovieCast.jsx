import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData.cast);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCastData();
  }, [movieId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!cast || cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul>
      {cast.map(({ id, name, profile_path, character }) => (
        <li key={id}>
          {profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={name}
            />
          ) : (
            <div>No Image Available</div>
          )}
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
