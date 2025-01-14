import axios from "axios";

const API_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmM0YWQ4MGNiOTE2ZTNhYTYxM2U0ZmEyYmYzN2I2MyIsIm5iZiI6MTczNjc3MzQwMS43MjgsInN1YiI6IjY3ODUwZjE5ZWU4NGZhNGRlZjdiOThiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xcEvnXd4B6rzd0GXLF3fgcIuFEQDgPF-Mqhus4_FIpQ";

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`${API_URL}/trending/movie/day`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await axios.get(`${API_URL}/search/movie`, {
    params: { query, include_adult: false },
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data.results;
};
export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`${API_URL}/search/movie`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`${API_URL}/movie/${movieId}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data;
};

export const fetchMovieCast = async (movieId) => {
  const { data } = await axios.get(`${API_URL}/movie/${movieId}/credits`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(`${API_URL}/movie/${movieId}/reviews`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data.results;
};
