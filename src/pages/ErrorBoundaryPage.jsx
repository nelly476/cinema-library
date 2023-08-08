import React from "react";

const ErrorBoundaryPage = ({ error, errorInfo }) => (
  <div>
    <h1>Something went wrong.</h1>
    <details style={{ whiteSpace: "pre-wrap" }}>
      {error && error.toString()}
      <br />
      {errorInfo.componentStack}
    </details>
  </div>
);

export default ErrorBoundaryPage;
