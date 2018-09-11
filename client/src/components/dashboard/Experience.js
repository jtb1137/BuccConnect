import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick = e => {
    this.props.deleteExperience(this.props.experience._id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.startdate}</Moment> -{" "}
          {exp.enddate === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.enddate}</Moment>
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
          <h4>Experience</h4>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Title</th>
                <th scope="col">Years</th>
                <th scope="col" />
              </tr>
              {experience}
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
