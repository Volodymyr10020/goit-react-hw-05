import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { fetchMovieCast } from "../../api";
import styles from "./MovieCast.module.css";

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
        const castData = await fetchMovieCast(movieId);
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
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!cast.length) {
    return <p className={styles.message}>No cast information available.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Movie Cast</h2>
      <ul className={styles.castList}>
        {cast.map(({ id, name, profile_path, character }) => (
          <li key={id} className={styles.castItem}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : defaultImg
              }
              alt={name}
              className={styles.actorImage}
            />
            <p className={styles.actorName}>{name}</p>
            <p className={styles.characterName}>
              Character: {character || "Unknown"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
