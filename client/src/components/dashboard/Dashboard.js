import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile, deleteAccount } from "../../actions/profileActions";
import Loading from "../shared/Loading";
import isEmpty from "../../validation/is-empty";
import ProfileButtons from "./ProfileButtons";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashContent;

    if (profile === null || loading) {
      dashContent = <Loading />;
    } else {
      if (!isEmpty(profile)) {
        dashContent = (
          <div>
            <h4 className="lead">
              Welcome{" "}
              <Link to={`/profile/${profile.username}`}>{user.name}</Link>
            </h4>
            <ProfileButtons />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        dashContent = (
          <div>
            <p className="lead">Welcome {user.name}</p>
            <p>Please set up your profile</p>
            <Link to="/create-profile" className="btn btn-lg">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashContent}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfile, deleteAccount }
)(Dashboard);
