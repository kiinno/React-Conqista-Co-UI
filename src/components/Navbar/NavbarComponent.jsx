import { Gear, Moon, SealCheck, SunDim } from "@phosphor-icons/react";
import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoggedUserDropdown from "../LoggedUserDropdown/LoggedUserDropdown";
import SystemContext from "../../context";
import TrigerActionButton from "../TrigerActionButton/TrigerActionButton";

const NavbarComponent = () => {
  const system = useContext(SystemContext);
  return (
    <>
      <Navbar
        expand="lg"
        className={`bg-${system.ui.theme}`}
        variant={system.ui.theme}
      >
        <Container fluid>
          {/* <Navbar.Brand href="/">Conqista-Co</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 text-capitalize"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <li className="nav-item">
                <NavLink className="nav-link" to={"/"}>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to={"/download"}>
                  Download
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to={"/store"}>
                  Store
                </NavLink>
              </li>
            </Nav>
            <div className="d-flex gap-3 flex-row align-items-center justify-content-center">
              <div
                className={`text-warning d-flex gap-2 flex-row spread-icons`}
              >
                <TrigerActionButton onClick={() => system.toggleTheme()}>
                  {system.ui.theme === "light" ? (
                    <SunDim size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                </TrigerActionButton>
                {/* <TrigerActionButton
                  onClick={() => system.toggleDettingsDrawer()}
                >
                  <Gear size={20} />
                </TrigerActionButton> */}
              </div>
              <div className="d-flex gap-2 flex-row align-items-center justify-content-center">
                {system.auth.isAuthenticated ? (
                  <>
                    <span
                      className={`userName d-flex flex-row justify-content-center align-items-center gap-1 text-${
                        system.ui.theme === "light" ? "dark" : "light"
                      }`}
                    >
                      {system.auth.user.firstName} {system.auth.user.lastName}
                      {system.auth.user.isAdmin && (
                        <SealCheck
                          size={16}
                          weight="fill"
                          className="text-primary"
                        />
                      )}
                    </span>

                    <LoggedUserDropdown />
                  </>
                ) : (
                  <div className="nav-item">
                    <NavLink
                      className={`text-${
                        system.ui.theme === "light" ? "dark" : "light"
                      } nav-link`}
                      to={"/auth/login"}
                    >
                      Login
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
