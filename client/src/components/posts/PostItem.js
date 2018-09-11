import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick = e => {
    this.props.deletePost(this.props.post._id);
  };

  onLikeClick = e => {
    this.props.addLike(this.props.post._id);
  };

  onRemoveLikeClick = e => {
    this.props.removeLike(this.props.post._id);
  };

  userLiked = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="my-3">
        <div className="card">
          <div className="card-header">
            {post.name}
            {post.user === auth.user.id ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onDeleteClick}
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
          <div className="card-body">{post.text}</div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p>{post.text}</p>
            {showActions ? (
              <span>
                <button onClick={this.onLikeClick} className="btn mr-1">
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.userLiked(post.likes)
                    })}
                  />
                </button>

                <button className="btn disabled mr-1">
                  <span>{post.likes.length}</span>
                </button>

                <button onClick={this.onRemoveLikeClick} className="btn mr-1">
                  <i className="fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-default mr-1">
                  {post.comments.length}{" "}
                  {post.comments.length === 1 ? "Comment" : "Comments"}
                </Link>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
