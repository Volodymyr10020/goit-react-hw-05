import axios from "axios";

const API_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";
const API_KEY = "cfc4ad80cb916e3aa613e4fa2bf37b63";

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
  try {
    const response = await fetch(
      `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie cast.");
    }

    const data = await response.json();
    console.log("Cast Data Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(`${API_URL}/movie/${movieId}/reviews`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });
  return data.results;
};
