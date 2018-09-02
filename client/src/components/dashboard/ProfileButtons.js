import React from "react";
import { Link } from "react-router-dom";

const ProfileButtons = () => {
  return (
    <div className="btn-group" role="group">
      <Link to="/edit-profile" className="btn">
        <i className="fas fa-user-circle">Edit Profile</i>
      </Link>
      <Link to="/add-experience" className="btn">
        <i className="fab fa-black-tie">Add Experience</i>
      </Link>
      <Link to="/add-education" className="btn">
        <i className="fas fa-graduation-cap">Add Education</i>
      </Link>
    </div>
  );
};

export default ProfileButtons;
