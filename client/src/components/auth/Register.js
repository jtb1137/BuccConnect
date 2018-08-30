import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">Sign Up</h2>
            <p className="lead text-center">Create your BuccConnect account.</p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
              </div>
              <input type="submit" value="Submit" className="btn btn-block" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;