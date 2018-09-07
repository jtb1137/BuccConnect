import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class About extends Component {
  render() {
    const { profile } = this.props;
    const firstName = profile.username.trim().split(" ")[0];
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" />
        {skill}
      </div>
    ));
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body mb-3">
              <h3 className="text-center">
                {firstName}
                's Bio
              </h3>
              <p className="lead">
                {" "}
                {isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}{" "}
              </p>
              <div className="row">
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {skills}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  profile: PropTypes.object.isRequired
};

export default About;
