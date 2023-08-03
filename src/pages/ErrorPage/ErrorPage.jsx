import React, { useContext } from "react";
import "./error-page.css";
import SystemContext from "../../context";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "react-bootstrap";

const ErrorPage = () => {
  const system = useContext(SystemContext);
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  return (
    <div
      className={`err-page gap-4 bg-${system.ui.theme} d-flex flex-column align-items-center justify-content-center`}
    >
      <div className="p-4 rounded shadow-sm bg-white">
        <div>
          <h2 className="text-danger">{error.error?.message}</h2>
          <p className="text-danger fw-light">
            Error in {error.error?.fileName} in line {error.error?.lineNumber}{" "}
            at column {error.error?.columnNumber}
          </p>
        </div>
        <pre>{error.error?.stack}</pre>
      </div>
      {error.status === 404 ? (
        <Button variant="outline-danger" onClick={() => navigate("/")}>
          Back To Home
        </Button>
      ) : (
        <Button
          variant="outline-danger"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      )}
    </div>
  );
};

export default ErrorPage;
