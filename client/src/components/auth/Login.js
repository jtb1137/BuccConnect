import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {},
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">Log In</h2>
            <p className="lead text-center">Log into your BuccConnect account.</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
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
