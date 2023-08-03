import { ArrowLeft } from "@phosphor-icons/react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TrigerActionButton from "../../components/TrigerActionButton/TrigerActionButton";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex flex-column bg-light"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div className="d-flex flex-row p-3">
        <TrigerActionButton onClick={() => navigate("/")}>
          <ArrowLeft size={20} />
        </TrigerActionButton>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
