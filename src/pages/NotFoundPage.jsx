import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div>
    <h1>404: Page Not Found</h1>
    <p>Sorry, the page you're looking for does not exist.</p>
    <Link to="/">Go back to the homepage</Link>
  </div>
);

export default NotFoundPage;
