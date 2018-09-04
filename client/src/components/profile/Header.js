import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class Header extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="text-center">
              <h1>{profile.name}</h1>
              <p className="text-center">
                {profile.status} at{" "}
                {isEmpty(profile.company) ? null : (
                  <span>{profile.company}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
              <div>
                {isEmpty(profile.website) ? null : (
                  <a
                    href={portfolio.website}
                    className="text-white p-2"
                    target="_blank"
                  >
                    {" "}
                    <i className="fas fa-globe fa-2x" />{" "}
                  </a>
                )}
                <h2>Finish Social Links - come from profile.social.whatever</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
