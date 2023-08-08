// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import {
//   fetchTopRatedMovies,
//   fetchPopularMovies,
//   fetchRecentMovies,
//   searchMovies,
// } from "../moviesSlice";

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// const HomePage = () => {
//   const dispatch = useAppDispatch();
//   const movies = useAppSelector((state) => state.movies.movies);
//   const status = useAppSelector((state) => state.movies.status);
//   const error = useAppSelector((state) => state.movies.error);

//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 300);

//   useEffect(() => {
//     if (debouncedQuery) {
//       dispatch(searchMovies(debouncedQuery));
//     } else {
//       dispatch(fetchTopRatedMovies(page)); // Reset to default view if search is cleared
//     }
//   }, [debouncedQuery, dispatch, page]);

//   const handleFilter = (filterType) => {
//     setPage(1);
//     switch (filterType) {
//       case "top-rated":
//         dispatch(fetchTopRatedMovies(page));
//         break;
//       case "popular":
//         dispatch(fetchPopularMovies(page));
//         break;
//       case "recent":
//         dispatch(fetchRecentMovies(page));
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSearch = (event) => {
//     setQuery(event.target.value);
//   };

//   let content;
//   if (status === "loading") {
//     content = <div>Loading...</div>;
//   } else if (status === "succeeded") {
//     content = (
//       <ul>
//         {movies.map((movie) => (
//           <li key={movie.id}>{movie.title}</li>
//         ))}
//       </ul>
//     );
//   } else if (status === "failed") {
//     content = <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Home Page</h1>

//       <div>
//         <button onClick={() => handleFilter("top-rated")}>Top Rated</button>
//         <button onClick={() => handleFilter("popular")}>Popular</button>
//         <button onClick={() => handleFilter("recent")}>
//           Recently Released
//         </button>
//       </div>

//       <div>
//         <input
//           type="text"
//           placeholder="Search movies..."
//           value={query}
//           onChange={handleSearch}
//         />
//       </div>

//       {content}

//       <div>
//         <button
//           onClick={() => setPage((prevPage) => prevPage - 1)}
//           disabled={page <= 1}
//         >
//           Previous
//         </button>
//         <span>Page {page}</span>
//         <button onClick={() => setPage((prevPage) => prevPage + 1)}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchRecentMovies,
  searchMovies,
} from "../moviesSlice";

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
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </main>

      <footer>
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
