import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PostForm from "./PostForm";
import Loading from "../shared/Loading";

class Posts extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
