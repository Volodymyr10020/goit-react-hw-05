import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviewsData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { results } = await fetchMovieReviews(movieId);
        setReviews(results || []);
      } catch (err) {
        setError("Failed to fetch reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewsData();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && reviews.length === 0 && (
        <p className={styles.message}>
          We do not have any reviews for this movie.
        </p>
      )}

      {!isLoading && !error && reviews.length > 0 && (
        <>
          <h2 className={styles.subtitle}>Reviews</h2>
          <ul className={styles.reviewsList}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={styles.reviewsItem}>
                <p className={styles.author}>Author: {author}</p>
                <p className={styles.reviewsText}>
                  {content || "No content available."}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieReviews;
