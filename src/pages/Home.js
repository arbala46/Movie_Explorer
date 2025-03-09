  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;  
  console.log("API ",API_KEY)

  const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      fetch(`http://www.omdbapi.com/?s=Avengers&apikey=${API_KEY}`) // Use `s=` for searching multiple movies
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data); // Check response in console
          setMovies(data.Search || []); // Ensure `Search` exists
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
      <div>
        <h2>Popular Movies</h2>
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="col-md-3">
              <div className="card mb-3">
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Home;
