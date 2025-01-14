import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { fetchMovieCast } from "../../api";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchCastData = async () => {
      setIsLoading(true);
      try {
        const { cast: castData } = await fetchMovieCast(movieId);
        setCast(castData || []);
      } catch (err) {
        setError(`Error fetching cast: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCastData();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className={css.loading}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className={css.error}>{error}</p>;
  }

  if (!cast.length) {
    return <p className={css.message}>No cast information available.</p>;
  }

  return (
    <div className={css.container}>
      <h2 className={css.subtitle}>Movie Cast</h2>
      <ul className={css.castList}>
        {cast.map(({ id, name, profile_path, character }) => (
          <li key={id} className={css.castItem}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : defaultImg
              }
              alt={name}
              className={css.actorImage}
            />
            <p className={css.actorName}>{name}</p>
            <p className={css.characterName}>
              Character: {character || "Unknown"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
