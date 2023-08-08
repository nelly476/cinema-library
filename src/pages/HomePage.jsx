import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchTopRatedMovies } from "../moviesSlice"; // Assuming you're fetching top-rated movies

const HomePage = () => {
  const dispatch = useAppDispatch();

  // Adjust the selectors based on your state's structure
  const movies = useAppSelector((state) => state.movies.movies);
  const status = useAppSelector((state) => state.movies.status);
  const error = useAppSelector((state) => state.movies.error);

  useEffect(() => {
    // No need to pass the API key directly here
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    );
  } else if (status === "failed") {
    content = <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      {content}
    </div>
  );
};

export default HomePage;
