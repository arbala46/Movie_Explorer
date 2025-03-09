import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;  // Replace with your OMDb API key

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = () => {
    if (!query.trim()) {
      setError("Please enter a movie name to search.");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/?s=Avengers&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error || "No movies found.");
          setMovies([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">🎬 Search Movies</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
        />
        <button onClick={searchMovies} className="btn btn-primary">
          🔍 Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-md-3">
            <div className="card mb-3">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
                className="card-img-top"
                alt={movie.Title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text"><strong>Year:</strong> {movie.Year}</p>
                <Link to={`/movie/${movie.imdbID}`} className="btn btn-outline-primary">
                  📌 View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
