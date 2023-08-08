import { Link } from "react-router-dom";

const ActorCard = ({ actor }) => {
  return (
    <Link to={`/actor/${actor.id}`} className="actor-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
        alt={actor.name}
        className="actor-image"
      />
      <p className="actor-name">{actor.name}</p>
    </Link>
  );
};

export default ActorCard;
