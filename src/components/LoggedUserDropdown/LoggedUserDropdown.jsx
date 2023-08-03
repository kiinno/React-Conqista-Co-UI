import React, { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import ProfileBoxAnchor from "../ProfileBoxAnchor/ProfileBoxAnchor";
import SystemContext from "../../context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoggedUserDropdown = () => {
  const system = useContext(SystemContext);
  const [userDropdown, setUserDropdown] = useState(false);
  const navigate = useNavigate();
  return (
    <Dropdown show={userDropdown}>
      <div
        className="dropdown-toggle d-flex align-items-center gap-2"
        type="button"
        id="dropdown-basic"
        data-toggle="dropdown"
        onClick={(ev) => setUserDropdown(!userDropdown)}
      >
        <ProfileBoxAnchor showName={false} />
      </div>

      <Dropdown.Menu variant={system.ui.theme} className="p-0 m-0">
        {/* <Dropdown.Item href="#/action-3">Completed Orders</Dropdown.Item> */}
        <Dropdown.Item
          onClick={() => {
            setUserDropdown(false);
            navigate("/account/profile");
          }}
        >
          Settings
        </Dropdown.Item>
        <Dropdown.Item
          className="text-danger"
          onClick={() => {
            system.logout();
            setUserDropdown(false);
            toast.success("Logged out successfully.");
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LoggedUserDropdown;
