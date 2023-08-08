import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchActorDetails } from "../actorsSlice";

const ActorPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const actor = useAppSelector((state) => state.actors.currentActor);

  useEffect(() => {
    dispatch(fetchActorDetails(id));
  }, [dispatch, id]);

  if (!actor) return <div>Loading...</div>;

  return (
    <div>
      <h1>{actor.name}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
      />
    </div>
  );
};

export default ActorPage;
