import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPopularActors, searchActors } from "../actorsSlice";
import ActorCard from "../components/ActorCard";

const ActorListPage = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actors.actors);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchActors({ query: debouncedQuery, page }));
    } else {
      dispatch(fetchPopularActors(page));
    }
  }, [dispatch, page, debouncedQuery]);

  return (
    <div className="actors__header">
      <h1>Popular Actors</h1>
      <input
        type="text"
        placeholder="Search actors..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="actors-grid">
        {actors.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>

      <footer className="pagination__area">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </footer>
    </div>
  );
};

export default ActorListPage;
