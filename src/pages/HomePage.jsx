import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchRecentMovies,
  searchMovies,
} from "../moviesSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("top-rated"); // default filter

  useEffect(() => {
    if (query) {
      dispatch(searchMovies({ query, page }));
    } else {
      switch (filter) {
        case "popular":
          dispatch(fetchPopularMovies(page));
          break;
        case "recent":
          dispatch(fetchRecentMovies(page));
          break;
        case "top-rated":
        default:
          dispatch(fetchTopRatedMovies(page));
          break;
      }
    }
  }, [dispatch, page, query, filter]);

  return (
    <div className="home-container">
      <header>
        <h2>TMDB</h2>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      <nav>
        <button onClick={() => setFilter("top-rated")}>Top Rated</button>
        <button onClick={() => setFilter("popular")}>Popular</button>
        <button onClick={() => setFilter("recent")}>Recently Released</button>
      </nav>

      <main>
        <div className="movies-grid">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-card"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="pagination__area">
        <button
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Next
        </button>
      </footer>
    </div>
  );
};

export default HomePage;
