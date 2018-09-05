import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Header from "./Profile";
import About from "./About";
import Credentials from "./Credentials";
import GithubRepos from "./GithubRepos";
import Loading from "../shared/Loading";

import { getProfileByUsername } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfileByUsername(this.props.match.params.username);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Loading />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn float-left mb-3">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <Header profile={profile} />
          <About profile={profile} />
          <Credentials
            education={profile.education}
            experience={profile.experience}
          />
          <GithubRepos />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByUsername: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByUsername }
)(Profile);
