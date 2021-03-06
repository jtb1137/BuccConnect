import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PostForm from "./PostForm";
import Loading from "../shared/Loading";
import Feed from "./Feed";

import { getPosts } from "../../actions/postActions";
import ProfileSmall from "../profile/ProfileSmall";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    const { auth } = this.props;
    let postContent;

    if (posts === null || loading) {
      postContent = <Loading />;
    } else {
      postContent = <Feed posts={posts} />;
    }

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4 col-lg-3 ">
            <ProfileSmall auth={auth} />
          </div>
          <div className="col-md-8 col-lg-9 ">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
