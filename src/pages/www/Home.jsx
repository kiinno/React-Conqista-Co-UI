import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SystemContext from "../../context";

const Home = () => {
  const system = useContext(SystemContext);
  const navigate = useNavigate();
  return (
    <div className="flex-grow-1 floating-bg-animation d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-light fs-1">
        <i>Welcome</i>, Conqista-Co Server
      </h1>
      <p
        className="text-secondary mt-2 mb-4 fs-6 text-center"
        style={{ maxWidth: "650px" }}
      >
        Adipisicing voluptate irure nostrud qu irure nostrud quis tempor
        excepteur irure nostrud quis excepteur voluptate irure nostrud quis in
        cillum voluptate.
      </p>

      <Button
        variant={system.ui.theme === "dark" ? "light" : "dark"}
        onClick={() => {
          navigate("/download");
        }}
      >
        Download Now
      </Button>
    </div>
  );
};

export default Home;
