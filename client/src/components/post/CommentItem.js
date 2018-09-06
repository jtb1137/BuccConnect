import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick = commentId => {
    this.props.deleteComment(this.props.post.post._id, this.props.comment._id);
  };

  render() {
    const { comment, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p>{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                type="button"
                className="btn btn-danger mr-1"
                onClick={this.onDeleteClick}
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
