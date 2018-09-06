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

  onLikeClick = (e, id) => {
    this.props.addLike(id);
  };

  onRemoveLikeClick = (e, id) => {
    this.props.removeLike(id);
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
      <div className="card card-body">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p>{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick(post._id)}
                  className="btn mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.userLiked(post.likes)
                    })}
                  />
                  <span>{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onRemoveLikeClick(post._id)}
                  className="btn mr-1"
                >
                  <i className="text-info fas fa-thumbs-down" />
                  <span>{post.likes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className="btn mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={this.onDeleteClick}
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
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
