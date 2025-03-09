import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;  // OMDb API Key

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    setLoading(true); // Start loading
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
          setError(null); // Clear any previous errors
        } else {
          setError("Movie not found!");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  // Show loading state
  if (loading) return <p>Loading...</p>;

  // Show error message if the API request failed
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className="img-fluid mb-3" />
      <p><strong>Year:</strong> {movie.Year || "N/A"}</p>
      <p><strong>Genre:</strong> {movie.Genre || "N/A"}</p>
      <p><strong>Plot:</strong> {movie.Plot || "No plot available."}</p>
    </div>
  );
};

export default MovieDetail;
