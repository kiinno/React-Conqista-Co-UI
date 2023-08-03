import React, { useContext } from "react";
import defaultAvatar from "../../images/default_profile_avatar2.png";

import "./profile-box-anchor.css";
import SystemContext from "../../context";

const ProfileBoxAnchor = ({ showName, onClick }) => {
  const { auth } = useContext(SystemContext);
  return (
    <div className="profile-box-anchor d-flex flex-row-reverse align-items-center gap-2">
      <div className="avatar-container">
        <img
          src={
            auth.user.avatar
              ? `http://localhost:8000${auth.user.avatar}`
              : defaultAvatar
          }
          alt="profile_avatar"
          className="avatar"
          crossOrigin="anonymous"
        />
      </div>
      {showName && <span className="userName">Kiinno GM</span>}
    </div>
  );
};

export default ProfileBoxAnchor;
