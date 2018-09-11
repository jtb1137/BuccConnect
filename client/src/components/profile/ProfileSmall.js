import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileSmall extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div className="card">
        <div className="card-header text-center">
          <a href="https://placeholder.com">
            <img src="https://via.placeholder.com/150x150" />
          </a>
          <h5>{auth.user.name}</h5>
        </div>
        <div className="card-body text-center">
          <span>Work</span>
          <hr />
          <Link to="/dashboard">Edit Information</Link>
          <hr />
          <Link to="/profile">View Profile</Link>
        </div>
      </div>
    );
  }
}

export default ProfileSmall;
