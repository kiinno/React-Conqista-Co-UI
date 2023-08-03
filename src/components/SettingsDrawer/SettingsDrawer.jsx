import React, { useContext } from "react";
import "./settings-drawer.css";
import SystemContext from "../../context";
import { X } from "@phosphor-icons/react";

const SettingsDrawer = () => {
  const system = useContext(SystemContext);
  return (
    <>
      <div
        className={`settings-drawer overflow-hidden shadow-sm text-${
          system.ui.theme === "dark" ? "light" : "dark"
        } bg-${system.ui.theme} d-${
          system.ui.settingsDrawer
            ? "block transformed"
            : "block un-transformed"
        }`}
      >
        <div className="h-100 d-flex flex-column gap-3">
          <div className="d-flex flex-row justify-content-between align-items-start">
            <X
              size={15}
              onClick={() => system.toggleDettingsDrawer()}
              style={{ cursor: "pointer" }}
            />
            <h6>Settings</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsDrawer;
