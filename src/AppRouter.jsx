import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import ActorPage from "./pages/ActorPage";
import ActorListPage from "./pages/ActorListPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundaryPage from "./pages/ErrorBoundaryPage";
import ErrorBoundary from "./pages/ErrorBoundary";

const AppRouter = () => {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryPage />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/actor/:id" element={<ActorPage />} />
        <Route path="/actors" element={<ActorListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRouter;
