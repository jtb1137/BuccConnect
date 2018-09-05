import React, { Component } from "react";
import PropTypes from "prop-types";

import PostItem from "./PostItem";

class Feed extends Component {
  render() {
    const { posts } = this.props;
    return posts.map(post => <PostItem key={post.id} post={post} />);
  }
}

Feed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Feed;
