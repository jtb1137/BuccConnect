import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../shared/TextFieldGroup";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
import InputGroup from "../shared/InputGroup";
import SelectFieldGroup from "../shared/SelectFieldGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      username: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      github: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.prevenDefault();

    console.log("onSubmit");
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      // @TODO - finish
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Github URL"
            name="github"
            icon="fab fa-github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />
        </div>
      );
    }
    const selectOptions = [
      { label: "Select Current Status", value: null },
      { label: "Employed", value: "employed" },
      { label: "Student", value: "student" },
      { label: "Looking", value: "looking" },
      { label: "Other", value: "other" }
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Profile</h1>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Profile Username"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                error={errors.username}
              />
              <SelectFieldGroup
                placeholder="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                error={errors.status}
                options={selectOptions}
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
              />
              <TextAreaFieldGroup
                placeholder="Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
              />
              <div>
                <button
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                  className="btn btn-dark"
                >
                  Add Social Network Links
                </button>
              </div>
              {socialInputs}
              <input type="submit" value="Submit" className="btn btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
