import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../shared/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">Sign Up</h2>
            <p className="lead text-center">Create your BuccConnect account.</p>
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                type="text"
                error={errors.name}
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              <TextFieldGroup
                type="email"
                error={errors.email}
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <TextFieldGroup
                type="password"
                error={errors.name}
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <TextFieldGroup
                type="password"
                error={errors.password2}
                placeholder="Confirm Password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
              <input type="submit" value="Submit" className="btn btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
