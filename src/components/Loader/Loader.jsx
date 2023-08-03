import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import SystemContext from "../../context";

const Loader = () => {
  const system = useContext(SystemContext);
  return (
    <div
      className={`position-fixed top-0 bottom-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-${system.ui.theme}`}
    >
      <Spinner
        animation="grow"
        variant={system.ui.theme === "light" ? "dark" : "light"}
      />
    </div>
  );
};

export default Loader;
