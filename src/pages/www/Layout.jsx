import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
// import SettingsDrawer from "../../components/SettingsDrawer/SettingsDrawer";

const Layout = () => {
  return (
    <>
      <div className="app d-flex flex-column">
        <NavbarComponent />
        <Outlet />
        {/* <SettingsDrawer /> */}
      </div>
    </>
  );
};

export default Layout;
