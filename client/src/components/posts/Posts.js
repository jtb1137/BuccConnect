import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PostForm from "./PostForm";
import Loading from "../shared/Loading";
import Feed from "./Feed";

import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Loading />;
    } else {
      postContent = <Feed posts={posts} />;
    }

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <div className="card card-info mb-3">
              <div className="card-header">My Profile</div>
              <div className="card-body">Card Body</div>
            </div>
          </div>
          <div className="col-md-8">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
