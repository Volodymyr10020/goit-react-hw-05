import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const { results } = await fetchMovieReviews(movieId);
        setReviews(results || []);
      } catch (err) {
        setError("Failed to fetch reviews.");
      }
    };

    fetchReviewsData();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.item}>
              <h3>Author: {author}</h3>
              <p>{content || "No content available."}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
