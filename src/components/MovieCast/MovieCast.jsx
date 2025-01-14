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
        const { cast: castData } = await fetchMovieCast(movieId);
        setCast(castData || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCastData();
  }, [movieId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!cast.length) {
    return <p>No cast information available.</p>;
  }

  return (
    <ul>
      {cast.map(({ id, name, profile_path, character }) => (
        <li key={id}>
          {profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              style={{ width: "100px", height: "150px" }}
            />
          ) : (
            <div>No Image Available</div>
          )}
          <p>
            <strong>{name}</strong>
          </p>
          <p>Character: {character || "Unknown"}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
