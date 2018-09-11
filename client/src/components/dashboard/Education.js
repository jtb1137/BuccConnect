import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick = e => {
    this.props.deleteEducation(this.props.education._id);
  };

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.startdate}</Moment> -{" "}
          {edu.enddate === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.enddate}</Moment>
          )}
        </td>
        <td>
          <button onClick={this.onDeleteClick} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="card">
        <div className="card-header">
          <h4>Education</h4>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">School</th>
                <th scope="col">Degree</th>
                <th scope="col">Years</th>
                <th scope="col" />
              </tr>
              {education}
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
