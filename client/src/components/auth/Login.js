import React, { Component } from "react";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">Log In</h2>
            <p className="lead text-center">
              Log into your BuccConnect account.
            </p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    is_invalid: errors.email
                  })}
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    is_invalid: errors.email
                  })}
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <input type="submit" value="Submit" className="btn btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
