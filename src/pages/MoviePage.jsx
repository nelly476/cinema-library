import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchMovieDetails } from "../moviesSlice";

const MoviePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const movie = useAppSelector((state) => state.movies.currentMovie);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
    </div>
  );
};

export default MoviePage;
