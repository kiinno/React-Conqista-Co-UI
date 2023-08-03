import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import SystemContext from "../../context";

const Download = () => {
  const system = useContext(SystemContext);
  const requirments = [
    ["CPU", "Pentium 3800MHz or higher", "Dual Core 2.4GHz or higher"],
    ["RAM", "128MB", "512MB"],
    ["VGA", "16MB, DirectX 3D, TNT2M64", "GeForce2 or higher"],
    [
      "SOUND",
      "DirectX 9.0c Compatibility Card",
      "DirectX 9.0c Compatibility Card",
    ],
    ["HDD", "2.0GB or more", "4.0GB or more"],
    ["OS", "Windows 2000, XP OS X 10.6", "Windows XP, 7, 8 OS X 10.9 or later"],
  ];
  return (
    <div
      className={`flex-grow-1 d-flex flex-column bg-${system.ui.theme} text-${
        system.ui.theme === "dark" ? "light" : "dark"
      } px-4 py-4`}
    >
      <h3>Download</h3>
      <p className="mb-4 mx-2">
        Fugiat ad incididunt deserunt velit id sit non non nulla adipisicing
        officia consectetur.
      </p>
      <ol className="d-flex flex-column gap-3 p-2 m-0">
        <li>
          <strong>Check the System Requirements:</strong> Conquer Online is a
          2.5D MMORPG game. If the system does not meet the minimum
          requirements, the game will not run or if it runs, it will not run
          properly. To run the game properly, it's recommended to meet the
          minimum requirements as much as possible.
        </li>
        <div>
          <h6 className="mb-3">See requirments</h6>
          <Table striped bordered hover variant={system.ui.theme}>
            <thead>
              <tr>
                <th>Classification</th>
                <th>Minimum Specs</th>
                <th>Recommended Specs</th>
              </tr>
            </thead>
            <tbody>
              {requirments.map((require, pi) => (
                <tr key={pi}>
                  {require.map((text, ci) => (
                    <td key={ci}>{text}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <Button
              variant={system.ui.theme === "dark" ? "light" : "dark"}
              href="http://localhost:8000/api/downloads/patch"
            >
              Download Patch
            </Button>
            <span className=" mx-2">or</span>
            <Button
              variant={system.ui.theme === "dark" ? "light" : "dark"}
              href="http://localhost:8000/api/downloads/client"
            >
              Download Full Client
            </Button>
          </div>
        </div>
        <li>
          <strong>Update DirectX / Drivers:</strong> First install DirectX 8.1
          or higher, as well as the latest drivers for your graphics card. If
          your drivers are already up to date, then you can proceed to the next
          step.
        </li>
        <li>
          <strong>Install the Game Client:</strong> Double-click on the
          self-executable file you downloaded, and then follow the instructions
          to install the game. It should install automatically, and place the
          game icon on your desktop.
        </li>
      </ol>
    </div>
  );
};

export default Download;
